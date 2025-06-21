import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, useAnimate } from "motion/react";
import { useTimer } from "react-timer-hook";

import randomWords from "random-words";

import translator from "@/lib/translator";
import {SingleWordInput} from "@/components/SingleWordInput";

interface GameModeProps {
  increasePigSpinSpeed: () => void;
}

type GameWord = {
  englishWord: string;
  pigLatinWord: string;
};

const GameMode = ({ increasePigSpinSpeed }: GameModeProps) => {
  const [isGameModeActivated, setIsGameModeActivated] = useState(true);
  const [scope, animate] = useAnimate();

  const [gameWord, setGameWord] = useState<GameWord>({
    englishWord: "",
    pigLatinWord: "",
  });
  const [gameScore, setGameScore] = useState(0);

  useEffect(() => {
    const randomWord = randomWords(1)[0];

    setGameWord({
      englishWord: randomWord,
      pigLatinWord: translator(randomWord).translatedWord,
    });
  }, [gameScore]);

  const handleTimerExpired = useCallback(() => {
    console.log(`Game time expired!`);
    setIsGameModeActivated(false);
  }, []);

  const wiggleWord = useCallback(async () => {
    await animate("#translateTag", { rotate: 0, scale: 1 }, { duration: 0.1 });
    await animate("#translateTag", { rotate: -5, scale: 1.1 }, { duration: 0.1 });
    await animate("#translateTag", { rotate: 0, scale: 1 }, { duration: 0.1 });
    await animate("#translateTag", { rotate: 5, scale: 1.1 }, { duration: 0.1 });
    await animate("#translateTag", { rotate: 0, scale: 1 }, { duration: 0.1 });
  }, [animate]);

  const expiryTimestamp = useMemo(() => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 45);
    return expiryTimestamp;
  }, []);

  const { seconds: secondsRemaining } = useTimer({
    expiryTimestamp,
    onExpire: handleTimerExpired,
  });

  const handleSubmitWord = useCallback((inputWord: string) => {
    if (inputWord === gameWord.pigLatinWord) {
      console.log(`Correct!`);
      setGameScore((prevScore) => prevScore + 1);
      increasePigSpinSpeed();
    } else {
      console.log(`Incorrect!`);
      wiggleWord();
    }
  }, [gameWord, increasePigSpinSpeed, wiggleWord]);
  return (
    <div className="flex flex-col gap-6" ref={scope}>
      <div className="flex flex-row items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-3 h-3 rounded-full bg-green-400"></span>
          <span className="text-white text-xl font-semibold">Score: <span className="text-green-300">{gameScore}</span></span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-400"></span>
          <span className="text-white text-xl font-semibold">Time: <span className="text-blue-300">{secondsRemaining}s</span></span>
        </div>
      </div>      {isGameModeActivated ? (
        <motion.div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg" id="translateTag">
          <div className="text-2xl text-white/80 mb-2">Translate this word:</div>
          <div className="text-4xl font-bold text-pink-300">
            {gameWord.englishWord}
          </div>
        </motion.div>
      ) : (
        <div className="text-center bg-red-500/20 backdrop-blur-sm rounded-xl p-8 border border-red-400/30">
          <div className="text-4xl font-bold text-red-300 mb-2">Game Over!</div>
          <div className="text-xl text-white/80">Final Score: <span className="text-green-300 font-semibold">{gameScore}</span></div>
        </div>
      )}

      <SingleWordInput
        isDisabled={!isGameModeActivated}
        onSubmitWord={handleSubmitWord}
      />
    </div>
  );
};

export { GameMode };
