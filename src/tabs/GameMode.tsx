import { useState, useEffect, useMemo, useCallback, useRef } from "react";
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

type GameState = "setup" | "playing" | "finished";

const GameMode = ({ increasePigSpinSpeed }: GameModeProps) => {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [selectedTime, setSelectedTime] = useState(60);
  const [scope, animate] = useAnimate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [gameWord, setGameWord] = useState<GameWord>({
    englishWord: "",
    pigLatinWord: "",
  });
  const [gameScore, setGameScore] = useState(0);

  const timeOptions = [30, 60, 90, 120];

  const generateNewWord = useCallback(() => {
    const randomWord = randomWords(1)[0];
    setGameWord({
      englishWord: randomWord,
      pigLatinWord: translator(randomWord).translatedWord,
    });
  }, []);

  useEffect(() => {
    if (gameState === "playing") {
      generateNewWord();
    }
  }, [gameScore, gameState, generateNewWord]);

  const handleTimerExpired = useCallback(() => {
    console.log(`Game time expired!`);
    setGameState("finished");
  }, []);

  const wiggleWord = useCallback(async () => {
    if (gameState !== "playing") return;
    await animate("#translateTag", { rotate: 0, scale: 1 }, { duration: 0.1 });
    await animate("#translateTag", { rotate: -5, scale: 1.1 }, { duration: 0.1 });
    await animate("#translateTag", { rotate: 0, scale: 1 }, { duration: 0.1 });
    await animate("#translateTag", { rotate: 5, scale: 1.1 }, { duration: 0.1 });
    await animate("#translateTag", { rotate: 0, scale: 1 }, { duration: 0.1 });
  }, [animate, gameState]);

  const expiryTimestamp = useMemo(() => {
    if (gameState !== "playing") return new Date();
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + selectedTime);
    return expiryTimestamp;
  }, [gameState, selectedTime]);

  const { seconds: secondsRemaining, restart } = useTimer({
    expiryTimestamp,
    onExpire: handleTimerExpired,
    autoStart: false,
  });
  const startGame = useCallback(() => {
    setGameScore(0);
    setGameState("playing");
    const newExpiryTime = new Date();
    newExpiryTime.setSeconds(newExpiryTime.getSeconds() + selectedTime);
    restart(newExpiryTime, true);
    
    // Focus the input after a brief delay to ensure the component has rendered
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [selectedTime, restart]);

  const resetGame = useCallback(() => {
    setGameState("setup");
    setGameScore(0);
    restart(new Date(), false);
  }, [restart]);

  const handleSubmitWord = useCallback((inputWord: string) => {
    if (gameState !== "playing") return;
    
    if (inputWord === gameWord.pigLatinWord) {
      console.log(`Correct!`);
      setGameScore((prevScore) => prevScore + 1);
      increasePigSpinSpeed();
    } else {
      console.log(`Incorrect!`);
      wiggleWord();
    }
  }, [gameWord, increasePigSpinSpeed, wiggleWord, gameState]);

  if (gameState === "setup") {
    return (
      <div className="flex flex-col gap-6" ref={scope}>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <h4 className="text-lg font-semibold text-pink-300 mb-2">How to Play:</h4>
            <ul className="text-white/80 space-y-1 text-left">
              <li>• Translate English words to Pig Latin as fast as you can</li>
              <li>• Type your translation and press space</li>
              <li>• Each correct answer increases your score and spins the pig faster!</li>
              <li>• Beat the clock and see how many you can get right</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Choose Game Duration:</label>
              <div className="flex gap-2 justify-center flex-wrap">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      selectedTime === time
                        ? 'bg-pink-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {time}s
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 text-sm"
        >
          End Game
        </button>
      </div>

      {gameState === "playing" ? (
        <motion.div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg" id="translateTag">
          <div className="text-2xl text-white/80 mb-2">Translate this word:</div>
          <div className="text-4xl font-bold text-pink-300">
            {gameWord.englishWord}
          </div>
        </motion.div>
      ) : (
        <div className="text-center bg-red-500/20 backdrop-blur-sm rounded-xl p-8 border border-red-400/30">
          <div className="text-4xl font-bold text-red-300 mb-4">🎉 Game Complete!</div>
          <div className="text-2xl text-white/80 mb-4">Final Score: <span className="text-green-300 font-bold">{gameScore}</span></div>
          <div className="space-y-3">
            <p className="text-white/70">
              {gameScore >= 15 ? "🏆 Amazing! Pig Latin Master!" :
               gameScore >= 10 ? "🥇 Great job! You're getting good at this!" :
               gameScore >= 5 ? "👍 Not bad! Keep practicing!" :
               "🐷 Keep trying! Practice makes perfect!"}
            </p>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Play Again
            </button>
          </div>
        </div>
      )}      <SingleWordInput
        ref={inputRef}
        isDisabled={gameState !== "playing"}
        onSubmitWord={handleSubmitWord}
      />
    </div>
  );
};

export { GameMode };
