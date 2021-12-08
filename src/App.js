import './App.css'
import { useState } from 'react'
import translator from './translator.js'

import axios from 'axios';
import _ from "lodash";

// const OINK_SERVER_URL = `http://oink.mersive.lan`;
const OINK_SERVER_URL = `http://localhost`;
const OINK_SERVER_PORT = 5000;

const requestTranslateWord = (wordToTranslate) => {
  axios.get(`${OINK_SERVER_URL}:${OINK_SERVER_PORT}/translateWord/${wordToTranslate}`)
  .then(res => {
    const response = res.data;
    if (!_.has(response, 'stemChangeIndex') || !_.has(response, 'pigLatinWord')) {
      console.error(`requestTranslateWord: bad response: response=[${JSON.stringify(response)}]`);
    }
    console.log(`requestTranslateWord: wordToTranslate=[${wordToTranslate}] stemChangeIndex=[${response.stemChangeIndex}] pigLatinWord=[${response.pigLatinWord}]`);
  })
  .error(err => {
    console.error(`requestTranslateWord: failure: ${err}`);
  });
}

function App() {
  const [englishInput, setEnglishInput] = useState('');
  const [pigLatinOutput, setPigLatinOutput] = useState('Type some English below!');

  const [pigSpinSpeed, setPigSpinSpeed] = useState(20);

  const handleChange = (e) => {
    const currentInputText = e.target.value;
    setEnglishInput(currentInputText);
    if (currentInputText[currentInputText.length-1] === ' ') {
      // if the last character entered was a space,
      // we don't want to create a loop, so we return early.
      return;
    }
    console.log(`handleChange: currentInputText=[${currentInputText}]`);
  }

  const handleSpace = (e) => {
    if (e.keyCode !== 32) {
      // we only care about spaces, so just exit if not a space.
      return;
    }

    // tokenize the words off the space
    const wordArray = englishInput.split(' ');

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

    console.log(`handleSpace: englishInput=[${englishInput}] allTranslatedWords=[${allTranslatedWords}]`);
    setPigLatinOutput(allTranslatedWords);

    setPigSpinSpeed(pigSpinSpeed * .9);
    console.log(`pigSpinSpeed=[${pigSpinSpeed}]`);
  }

  const resetInputField = () => {
    setEnglishInput("");
    setPigLatinOutput('Type some English below!');
  };

  return (
    <div className="App">
      <header>English-to-Pig Latin Translator</header>
      <img
        src="/pigggggy.png"
        alt="This piggy went to market"
        style={{"animation": `pigImageSpin infinite ${pigSpinSpeed}s linear`}}
        // className="pigImage"
      />
      <span className="pigLatinOutput">{pigLatinOutput}</span>
      <input
        className="englishInput"
        type="text"
        value={englishInput}
        onChange={handleChange}
        onKeyDown={handleSpace}
        placeholder="This little piggy went to market..."
      />
      <button className="button-1" role="button" onClick={resetInputField}><span className="text">Reset</span></button>
    </div>
  );

}

export default App;
