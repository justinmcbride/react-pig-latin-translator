import './App.css'
import { useEffect, useState } from 'react'
import translator from './translator.js'
import MicRecorder from 'mic-recorder-to-mp3';

import axios from 'axios';
import _ from "lodash";

// const OINK_SERVER_URL = `http://oink.mersive.lan`;
const OINK_SERVER_URL = `http://localhost`;
const OINK_SERVER_PORT = 5000;

const App = () => {
  const [englishInput, setEnglishInput] = useState(``);
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [pigSpinSpeed, setPigSpinSpeed] = useState(20);

  const requestTranslateWord = (wordToTranslate) => {
    axios.get(`${OINK_SERVER_URL}:${OINK_SERVER_PORT}/translateWord/${wordToTranslate}`)
    .then(res => {
      const response = res.data;
      if (!_.has(response, `stemChangeIndex`) || !_.has(response, `pigLatinWord`)) {
        console.error(`requestTranslateWord: bad response: response=[${JSON.stringify(response)}]`);
      }
      console.log(`requestTranslateWord: wordToTranslate=[${wordToTranslate}] stemChangeIndex=[${response.stemChangeIndex}] pigLatinWord=[${response.pigLatinWord}]`);
    })
    .catch(err => {
      console.error(`requestTranslateWord: failure: ${err}`);
    });
  }

  const handleChange = (e) => {
    const currentInputText = e.target.value;
    setEnglishInput(currentInputText);

    console.log(`handleChange: currentInputText=[${currentInputText}]`);

    // tokenize the words off the space
    const wordArray = currentInputText.split(' ');

    // create a variable to store the concatenated output
    let allTranslatedWords = '';

    // iterate over every individual word
    for (const word of wordArray) {
      // perform the translation of the individual word
      const translatedWord = translator(word);
      requestTranslateWord(word);

      // add it to the final output
      allTranslatedWords += translatedWord + " ";
    }

    console.log(`handleChange: allTranslatedWords=[${allTranslatedWords}]`);
    setPigLatinOutput(allTranslatedWords);
    setPigSpinSpeed(pigSpinSpeed * .9);
  }

  const resetInputField = () => {
    setEnglishInput(``);
    setPigLatinOutput(``);
    setPigSpinSpeed(20);
  };

  const [Mp3Recorder, setMp3Recorder] = useState(
    new MicRecorder({ bitRate: 128 })
    );
  const [browserPermissons, setBrowserPermissions] = useState(false);
  const [recordingState, setRecordingState] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const handleBrowserPermissions = () => {
    setBrowserPermissions(true)
  };

  const startRecording = () => {
    setRecordingState(true)
  }

  const stopRecording = () => {
    setRecordingState(false)
  }

  const handleBlobURL = (e) => {
    const currentBlobURL = e.target.value;
    setBlobURL(currentBlobURL);
  }

  const startRecord = () => {
      Mp3Recorder
        .start()
        .then(() => {
          startRecording();
          console.log("recording state:", {recordingState});
        }).catch((e) => console.error(e))
  }


const stopRecord = () => {
    Mp3Recorder
    .stop()
    .getMp3().then(([buffer, blob]) => {
      const file = new File(buffer, 'audio_recording.mp3', {
        type: blob.type,
        lastModified: Date.now()
      });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = 'audio_recording.mp3';
      a.click();

     }).catch((e) => {
       alert('We could not retrieve your message');
       console.log(e);
     });
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
      <span className="pigLatinOutput">{pigLatinOutput}</span>
      <input
        className="englishInput"
        value={englishInput}
        type="text"
        onChange={handleChange}
        placeholder="This little piggy went to market..."
      />
      <button class="button-1" onClick={resetInputField}><span class="text">Reset</span></button>
      <button className="button-1" onClick={startRecord} disabled={recordingState}><span className="text">Talk</span></button>
      <button className="button-1" onClick={stopRecord} disabled={!recordingState}><span className="text">Stop Talking</span></button>
    </div>
  );

}

export default App;
