import react from 'react';

const NormalTranslator = (props) => {

  const {
    animatingWords,
  } = props;

  const animatedWords = [];
  for (const word of animatingWords) {
    animatedWords.push( <span className="animatedWord">{word.pigLatinWord}</span> );
  }

  return (
    <div>
      <div id="animationContainer">
        {animatedWords}
      </div>
    </div>
  )
}

export default NormalTranslator;
