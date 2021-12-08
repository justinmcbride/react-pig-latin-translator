import './App.css'
import { useState } from 'react'
import translator from './translator.js'

function App() {
  const [englishInput, setEnglishInput] = useState('');
  const [pigLatinOutput, setPigLatinOutput] = useState('Type some English below!');

  const [pigSpinSpeed, setPigSpinSpeed] = useState(20);

  const handleChange = (e) => {
    const currentInputText = e.target.value;
    if (currentInputText[currentInputText.length-1] === ' ') {
      // if the last character entered was a space,
      // we don't want to create a loop, so we return early.
      return;
    }

    console.log(`handleChange: currentInputText=[${currentInputText}]`);
    setEnglishInput(currentInputText);
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

    setPigSpinSpeed(pigSpinSpeed-1);
    console.log(`pigSpinSpeed=[${pigSpinSpeed}]`);
  }

  return (
    <div className="App">
      <header>Pig Latin Translator</header>
      <img
        src="/pigggggy.png"
        alt="This piggy went to market"
        // style={{"animation": `pigImageSpin infinite ${pigSpinSpeed}s linear`}}
        className="pigImage"
      />
    
      <span className="pigLatinOutput">{pigLatinOutput}</span>
      <input
        className="englishInput"
        type="text"
        onChange={handleChange}
        onKeyDown={handleSpace}
        placeholder="This little piggy went to market..."
      />
    </div>
  );
}

export default App;
