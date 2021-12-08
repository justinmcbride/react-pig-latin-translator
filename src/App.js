import './App.css'
import { useState } from 'react'
import translator from './translator.js'

function App() {
  const [englishInput, setEnglishInput] = useState('');
  const [pigLatinOutput, setPigLatinOutput] = useState('');

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
    setPigLatinOutput('');
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
      <span className="pigLatinOutput">{pigLatinOutput}</span>
      <input
        className="englishInput"
        type="text"
        value={englishInput}
        onChange={handleChange}
        onKeyDown={handleSpace}
        placeholder="This little piggy went to market..."
      />
      <button class="button-1" onClick={resetInputField}><span class="text">Reset</span></button>
    </div>
  );

}

export default App;
