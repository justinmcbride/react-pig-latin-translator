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
    <div className="flex flex-col gap-4" ref={scope}>
      <div className="flex flex-row" >
        <span className="text-white text-2xl">Score: {gameScore}</span>
        <span className="flex grow" />
        <span className="text-white text-2xl">Time: {secondsRemaining}</span>
      </div>

      {isGameModeActivated ? (
        <motion.div className="text-4xl" id="translateTag">
          Translate: <span className="text-white">{gameWord.englishWord}</span>
        </motion.div>
      ) : (
        <div className="text-4xl">Game Over!</div>
      )}

      <SingleWordInput
        isDisabled={!isGameModeActivated}
        onSubmitWord={handleSubmitWord}
      />
    </div>
  );
};

export default GameMode;
