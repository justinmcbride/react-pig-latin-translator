import logo from './pigggggy.png';
import './App.css'
import { useState } from 'react'
import translator from './translator.js'

function App() {
  const [word, setWord] = useState('')
  const handleChange = (e) => {
    setWord(e.target.value)
    translator(word)
  }

  return (
    <div className="App">
      <header className="App-header">
      <p>
          Pig Latin Translator
      </p>
        <img src={logo} className="App-logo" alt="logo" />
        <input
          className="box"
          type="text"
          value={word}
          onChange={handleChange}
          placeholder="Please type a word or a phrase"
        />
        <span className="box2" id='display'/>
      </header>
    </div>
  );
}

export default App;
