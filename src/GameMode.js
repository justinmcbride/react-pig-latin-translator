import {useState, useEffect} from 'react';

import {useTimer} from 'react-timer-hook';

import styled from 'styled-components';
import randomWords from 'random-words';

import translator from './translator';
import SingleWordInput from './SingleWordInput';

const GameScore = styled.span`
  color: white;
  font-size: calc(10px + 2vmin)
`;

const GameTime = styled.span`
  color: white;
  font-size: calc(10px + 2vmin)
`;

const Spacer = styled.span`
  flex-grow: 1;
`;

const GameStateContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Prompt = styled.div`
`;

const WordToType = styled.span`
  color: white;
`;

const GameMode = ({increasePigSpinSpeed}) => {
  const [isGameModeActivated, setIsGameModeActivated] = useState(true);

  const [gameWord, setGameWord] = useState(``);
  const [gameScore, setGameScore] = useState(0);

  useEffect(() => {
    const randomWord = randomWords();

    setGameWord({
      englishWord: randomWord,
      pigLatinWord: translator(randomWord),
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
      <GameStateContainer>
        <GameScore>Score: {gameScore}</GameScore>
        <Spacer/>
        <GameTime>Time: {secondsRemaining}</GameTime>
      </GameStateContainer>
      
      { isGameModeActivated
        ? <Prompt>Translate: <WordToType>{gameWord.englishWord}</WordToType></Prompt>
        : <Prompt>Game Over!</Prompt>
      }

      <SingleWordInput isDisabled={!isGameModeActivated} onSubmitWord={handleSubmitWord}/>
    </div>
  )
};

export default GameMode;
