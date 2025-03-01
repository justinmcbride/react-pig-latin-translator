import {useState, useEffect} from 'react';

import {useTimer} from 'react-timer-hook';

import randomWords from 'random-words';

import translator from '@/lib/translator';
import SingleWordInput from '@/components/SingleWordInput';

const GameMode = ({increasePigSpinSpeed}) => {
  const [isGameModeActivated, setIsGameModeActivated] = useState(true);

  const [gameWord, setGameWord] = useState(``);
  const [gameScore, setGameScore] = useState(0);

  useEffect(() => {
    const randomWord = randomWords();

    setGameWord({
      englishWord: randomWord,
      pigLatinWord: translator(randomWord).translatedWord,
    });
  }, [gameScore]);

  const handleTimerExpired = () => {
    console.log(`Game time expired!`);
    setIsGameModeActivated(false);
  };

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 45);

  const {
    seconds: secondsRemaining,
  } = useTimer({ expiryTimestamp, onExpire: handleTimerExpired});

  const handleSubmitWord = (inputWord) => {
    if (inputWord === gameWord.pigLatinWord) {
      console.log(`Correct!`);
      setGameScore(gameScore + 1);
      increasePigSpinSpeed();
    }
    else {
      console.log(`Incorrect!`);
    }
  }

  return (
    <div className="gameModeContainer">
      <div className="flex flex-row">
        <span className="text-white text-2xl">Score: {gameScore}</span>
        <span className="flex grow" />
        <span className="text-white text-2xl">Time: {secondsRemaining}</span>
      </div>
      
      { isGameModeActivated
        ? <div className="text-4xl">Translate: <span className="text-white">{gameWord.englishWord}</span></div>
        : <div className="text-4xl">Game Over!</div>
      }

      <SingleWordInput isDisabled={!isGameModeActivated} onSubmitWord={handleSubmitWord}/>
    </div>
  )
};

export default GameMode;
