import {useState, useEffect} from 'react';

import {useTimer} from 'react-timer-hook';

import styled from 'styled-components';
import randomWords from 'random-words';

import translator from './translator';
import SingleWordInput from './SingleWordInput';

const GameScore = styled.span`
  color: white;
  font-size: 1.5em;
`;

const GameTime = styled.span`
  color: white;
  font-size: 1.5em;
`;

const Spacer = styled.span`
  flex-grow: 1;
`;

const GameStateContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Prompt = styled.div`
  font-size: 2em;
`;

const WordToType = styled.span`
  color: white;
`;

const GameDescription = styled.div`
  color: white;
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const StartButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const GameMode = ({increasePigSpinSpeed}) => {
  const [isGameModeActivated, setIsGameModeActivated] = useState(false);
  const [gameWord, setGameWord] = useState(``);
  const [gameScore, setGameScore] = useState(0);
  const [expiryTimestamp, setExpiryTimestamp] = useState(null);

  useEffect(() => {
    if (isGameModeActivated) {
      const randomWord = randomWords();
      setGameWord({
        englishWord: randomWord,
        pigLatinWord: translator(randomWord),
      });
    }
  }, [gameScore, isGameModeActivated]);

  const handleTimerExpired = () => {
    console.log(`Game time expired!`);
    setIsGameModeActivated(false);
  };

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

  const startGame = () => {
    setGameScore(0);
    setIsGameModeActivated(true);
    const newExpiryTimestamp = new Date();
    newExpiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + 45);
    setExpiryTimestamp(newExpiryTimestamp);
  }

  return (
    <div className="gameModeContainer">
      <GameDescription>
        Welcome to the Pig Latin Translator Game! Translate the given English word into Pig Latin as quickly as possible. You have 45 seconds to score as many points as you can. Good luck!
      </GameDescription>
      { !isGameModeActivated && <StartButton onClick={startGame}>Start Game</StartButton> }
      <GameStateContainer>
        <GameScore>Score: {gameScore}</GameScore>
        <Spacer/>
        <GameTime>Time: {secondsRemaining}</GameTime>
      </GameStateContainer>
      
      { isGameModeActivated
        ? <Prompt>Translate: <WordToType>{gameWord.englishWord}</WordToType></Prompt>
        : <Prompt>Game Over! <StartButton onClick={startGame}>Restart Game</StartButton></Prompt>
      }

      <SingleWordInput isDisabled={!isGameModeActivated} onSubmitWord={handleSubmitWord}/>
    </div>
  )
};

export default GameMode;
