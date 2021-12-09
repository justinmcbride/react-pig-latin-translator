import './App.css'
import './GameSwitch.css'

import { useState } from 'react'
import MicRecorder from 'mic-recorder-to-mp3';

import axios from 'axios';
import _ from "lodash";
import FormData from 'form-data'

import NormalTranslator from './NormalTranslator';
import GameMode from './GameMode';

//const OINK_SERVER_URL = `https://localhost`;
const OINK_SERVER_URL = `https://oink.mersive.lan`;
const OINK_SERVER_PORT = 5001;

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const App = () => {
  const [englishInput, setEnglishInput] = useState(``);
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [pigSpinSpeed, setPigSpinSpeed] = useState(20);

  const [recordingState, setRecordingState] = useState(false);
  const [isGameModeActivated, setIsGameModeActivated] = useState(false);
  const [animatingWords, setAnimatingWords] = useState([]);

  const requestTranslateWord = (wordToTranslate) => {
    console.log(`requestTranslateWord: wordToTranslate=[${wordToTranslate}]`);
    if (wordToTranslate == "mersive") {
      console.log("rick roll")
    }
    else {
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
    }
  };

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

      requestTranslateWord(wholeInputWord);
      return;
    }

    setEnglishInput(trimmedInput);
    setPigSpinSpeed(pigSpinSpeed * .9);
  }

  const onGameModeClicked = (e) => {
    const isActivated = e.target.checked;
    setIsGameModeActivated(isActivated);
  };

  const resetInputField = () => {
    setEnglishInput(``);
    setPigLatinOutput(``);
    setPigSpinSpeed(20);
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

  return (
    <div className="App">
      <header className="header">English-to-Pig Latin Translator</header>
      <img
        src="/pigggggy.png"
        alt="This piggy went to market"
        // style={{"animation": `pigImageSpin infinite ${pigSpinSpeed}s linear`}}
        className="pigImage"
      />
      <img
        className="mersive"
        alt="Innovation that excites"
        src="/mersive2.png"
      />

      { isGameModeActivated ? <GameMode/> : <NormalTranslator animatingWords={animatingWords}/> }

      <div className="pigLatinOutput">{pigLatinOutput}</div>

      <input
        className="englishInput"
        value={englishInput}
        type="text"
        onChange={handleChange}
        placeholder="This little piggy went to market..."
      />
      <div className="buttonsBox">
        <button className="button-2" inline="true" onClick={startRecord} disabled={recordingState}><span className="text">Talk</span></button>
        <button className="button-3" inline="true" onClick={stopRecord} disabled={!recordingState}><span className="text">Stop Talking</span></button>
        <span className="span"></span>
        <button className="button-1" inline="true" onClick={resetInputField}><span className="text">Reset</span></button>
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
