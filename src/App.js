import logo from './pigggggy.png';
import './App.css'
import { useState } from 'react'

function App() {
  const [word, setWord] = useState('')
  const handleChange = (e) => {
    setWord(e.target.value)
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
      </header>
    </div>
  );
}

export default App;
