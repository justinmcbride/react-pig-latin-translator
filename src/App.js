import './App.css';
import './GameSwitch.css';

import { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';
import _ from "lodash";
import FormData from 'form-data'

import NormalTranslator from './NormalTranslator';
import GameMode from './GameMode';

<<<<<<< HEAD
import { OINK_SERVER_URL, OINK_SERVER_PORT } from './ServerInfo';
=======
//const OINK_SERVER_URL = `https://localhost`;
const OINK_SERVER_URL = `https://oink.mersive.lan`;
const OINK_SERVER_PORT = 5001;
>>>>>>> 89e5cb5377104220344d00fc86e7124fcbabfa52

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const App = () => {
  const [englishInput, setEnglishInput] = useState(``);
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [pigSpinSpeed, setPigSpinSpeed] = useState(20);

  const [recordingState, setRecordingState] = useState(false);
  const [isGameModeActivated, setIsGameModeActivated] = useState(false);
  const [animatingWords, setAnimatingWords] = useState([]);

  const [gameWord, setGameWord] = useState(``);
  const [gameScore, setGameScore] = useState(0);

  const requestTranslateWord = (wordToTranslate) => {
    console.log(`requestTranslateWord: wordToTranslate=[${wordToTranslate}]`);
    axios
      .get(`${OINK_SERVER_URL}:${OINK_SERVER_PORT}/oink/${wordToTranslate}`)
      .then(res => {
        const response = res.data;
        if (!_.has(response, `stemChangeIndex`) || !_.has(response, `pigLatinWord`)) {
          console.error(`requestTranslateWord: bad response: response=[${JSON.stringify(response)}]`);
        }

        setPigLatinOutput(`${pigLatinOutput} ${response.pigLatinWord}`);

        setAnimatingWords([...animatingWords, response]);
        console.log(`requestTranslateWord: wordToTranslate=[${wordToTranslate}] stemChangeIndex=[${response.stemChangeIndex}] pigLatinWord=[${response.pigLatinWord}]`);
      })
      .catch(err => {
        console.error(`requestTranslateWord: failure: ${err}`);
      })
    ;
  };

  useEffect( () => {
    const ourFunction = async() => {
      const newWord = await requestGameWord();
      setGameWord(newWord);
      console.log(`Got new word: ${newWord}`);
    };

    ourFunction();
  }, [gameScore]);

  const handleChange = (e) => {
    const currentInputText = e.target.value;
    const trimmedInput = currentInputText.trimStart();

    if (trimmedInput.length === 0) {
      setEnglishInput(``);
      return;
    }

    const wholeInputWord = trimmedInput.trimEnd();
    if (wholeInputWord.length !== trimmedInput.length) {
      console.log(`Word completed: [${wholeInputWord}]`);
      setEnglishInput(``);

      if (isGameModeActivated) {
        if (wholeInputWord === gameWord.pigLatinWord) {
          console.log(`Correct!`);
          setGameScore(gameScore + 1);
        }
        else {
          console.log(`Incorrect!`);
        }
      }
      else {
        requestTranslateWord(wholeInputWord);
      }
      
      return;
    }

    setEnglishInput(trimmedInput);
    setPigSpinSpeed(pigSpinSpeed * .9);
  }

  const onGameModeClicked = (e) => {
    const isActivated = e.target.checked;

    setIsGameModeActivated(isActivated);
    resetEverything();
    if (isActivated) {
      start();
    }
  };

  const gameTimerExpired = () => {

  };

  const resetEverything = () => {
    if (!isRunning && isGameModeActivated) {
      window.location.reload();
    }
    else {
      setEnglishInput(``);
      setPigLatinOutput(``);
      setAnimatingWords([]);
      setPigSpinSpeed(20);
    }
  };

  const startRecord = () => {
    console.log(`Attempting to start recording`);
    Mp3Recorder
      .start()
      .then(() => {
        setRecordingState(true);
      })
      .catch((e) => {
        console.error(`Failed to start recording`, e);
      })
    ;
  };

  const stopRecord = () => {
    console.log(`Attempting to stop recording`);
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        setRecordingState(false);
        const formData = new FormData();
        formData.append('file', blob, 'audio_recording');
        axios({
          method: 'post',
          url: `${OINK_SERVER_URL}:${OINK_SERVER_PORT}/audio_recordings`,
          data: formData,
          headers: {'Content-Type': 'multipart/form-data' }
          })
          .then(function (response) {
              //handle success
              console.log(response);
              console.log(response.data);
              setPigLatinOutput(response.data)
          })
          .catch(function (response) {
              console.log(response);
          });
      }).catch((e) => {
        console.error(`Failed to stop recording`, e);
      })
    ;
  };

  const requestGameWord = async() => {
    try {
      const res = await axios.get(`${OINK_SERVER_URL}:${OINK_SERVER_PORT}/getWord`);
      const response = res.data;
        if (!_.has(response, `englishWord`) || !_.has(response, `pigLatinWord`)) {
          console.error(`requestGameWord: bad response: response=[${JSON.stringify(response)}]`);
        }
  
      return response;
    } catch (err) {
      console.error(`requestGameWord: failure: ${err}`);
      return {};
      // TODO: maybe broken
    }
  }

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 20);

  const {
    seconds,
    isRunning,
    start,
  } = useTimer({ expiryTimestamp, onExpire: gameTimerExpired, autoStart: false});

  return (
    <div className="App">
      <header className="header">English-to-Pig Latin Translator</header>
      <img
        src="/pigggggy.png"
        alt="This piggy went to market"
        style={{"animation": `pigImageSpin infinite ${pigSpinSpeed}s linear`}}
        className="pigImage"
      />
      <img
        className="mersive"
        alt="Innovation that excites"
        src="/mersive2.png"
      />

      { isGameModeActivated ?
        <GameMode timeRemaining={seconds} isGameActive={isRunning} gameScore={gameScore}/> :
        <NormalTranslator animatingWords={animatingWords}/>
      }

      <div className="pigLatinOutput">
      { isGameModeActivated ?
        gameWord.englishWord :
        pigLatinOutput
      }

      </div>

      <input
        className="englishInput"
        value={englishInput}
        type="text"
        onChange={handleChange}
        disabled={isGameModeActivated && !isRunning}
        placeholder="This little piggy went to market..."
      />
      <div className="buttonsBox">
        <button className="button-2" inline="true" onClick={startRecord} disabled={recordingState}><span className="text">Talk</span></button>
        <button className="button-3" inline="true" onClick={stopRecord} disabled={!recordingState}><span className="text">Stop Talking</span></button>
        <span className="span"></span>
        <button className="button-1" inline="true" onClick={resetEverything}><span className="text">Reset</span></button>
      </div>
      <div className="gameSwitchContainer">
        <label className="switch">
          <input type="checkbox" onClick={onGameModeClicked}/>
          <span className="slider"></span>
        </label>
        <div className="switchText">Do you want to play a game?</div>
      </div>
      <div className="verticalSpacing"></div>
    </div>
  );

}

export default App;
