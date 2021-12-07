import logo from './pigggggy.png';
import './App.css'
import { useState } from 'react'
import translator from './translator.js'

function App() {
  const [word, setWord] = useState('');
  const [anotherWord, setAnotherWord] = useState([])
  const handleChange = (e) => {
    const allText = e.target.value;
    if (allText[allText.length-1] === ' ') {
      console.log("short circuit");
      return;

    }
    console.log(`handleChange: allText=[${allText}]`);
    setWord(allText);
  }
  const handleSpace= (e) => {
    if (e.keyCode === 32) {
      const wordArray = word.split(' ')
      let allTranslatedWords = ''

      for( const word of wordArray ) {
        const translatedWord = translator(word);
        allTranslatedWords += translatedWord + " ";
      }

      console.log(`handleSpace: originalword=[${word}] allTranslatedWords=[${allTranslatedWords}]`);
      setAnotherWord(allTranslatedWords);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <p>
          Pig Latin Translator
      </p>
        <img src={logo} className="App-logo" alt="logo" />
        <span className="box2" id='display'> {anotherWord} </span>
        <input
          className="box"
          type="text"
          onChange={handleChange}
          onKeyDown={handleSpace}
          placeholder="Please type a word or a phrase"
        />
      </header>
    </div>
  );
}

export default App;
