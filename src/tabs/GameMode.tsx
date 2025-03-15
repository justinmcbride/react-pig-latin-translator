import { useState, useEffect, useMemo } from "react";

import { useTimer } from "react-timer-hook";

import randomWords from "random-words";

import translator from "@/lib/translator";
import SingleWordInput from "@/components/SingleWordInput";

interface GameModeProps {
  increasePigSpinSpeed: () => void;
}

type GameWord = {
  englishWord: string;
  pigLatinWord: string;
};

const GameMode = ({ increasePigSpinSpeed }: GameModeProps) => {
  const [isGameModeActivated, setIsGameModeActivated] = useState(true);

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

  const handleTimerExpired = () => {
    console.log(`Game time expired!`);
    setIsGameModeActivated(false);
  };

  const expiryTimestamp = useMemo(() => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 45);
    return expiryTimestamp;
  }, []);

  const { seconds: secondsRemaining } = useTimer({
    expiryTimestamp,
    onExpire: handleTimerExpired,
  });

  const handleSubmitWord = (inputWord: string) => {
    if (inputWord === gameWord.pigLatinWord) {
      console.log(`Correct!`);
      setGameScore((prevScore) => prevScore + 1);
      increasePigSpinSpeed();
    } else {
      console.log(`Incorrect!`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row">
        <span className="text-white text-2xl">Score: {gameScore}</span>
        <span className="flex grow" />
        <span className="text-white text-2xl">Time: {secondsRemaining}</span>
      </div>

      {isGameModeActivated ? (
        <div className="text-4xl">
          Translate: <span className="text-white">{gameWord.englishWord}</span>
        </div>
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
