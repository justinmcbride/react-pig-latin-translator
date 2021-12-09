import './App.css'
import { useState } from 'react'
import MicRecorder from 'mic-recorder-to-mp3';

import axios from 'axios';
import _ from "lodash";

// const OINK_SERVER_URL = `http://oink.mersive.lan`;
const OINK_SERVER_URL = `http://localhost`;
const OINK_SERVER_PORT = 5000;

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const App = () => {
  const [englishInput, setEnglishInput] = useState(``);
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [pigSpinSpeed, setPigSpinSpeed] = useState(20);

  const [recordingState, setRecordingState] = useState(false);

  const [animatingWords, setAnimatingWords] = useState([]);

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
        const file = new File(buffer, 'audio_recording.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = 'audio_recording.mp3';
        a.click();
      }).catch((e) => {
        console.error(`Failed to stop recording`, e);
      })
    ;
  };

  const animatedWords = [];
  for (const word of animatingWords) {
    animatedWords.push( <span className="animatedWord">{word.pigLatinWord}</span> );
  }

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

      <div id="animationContainer">
        {animatedWords}
      </div>

      <div className="pigLatinOutput">{pigLatinOutput}</div>
      
      <input
        className="englishInput"
        value={englishInput}
        type="text"
        onChange={handleChange}
        placeholder="This little piggy went to market..."
      />
      <button className="button-1" onClick={resetInputField}><span class="text">Reset</span></button>
      <button className="button-1" onClick={startRecord} disabled={recordingState}><span className="text">Talk</span></button>
      <button className="button-1" onClick={stopRecord} disabled={!recordingState}><span className="text">Stop Talking</span></button>
    </div>
  );

}

export default App;
