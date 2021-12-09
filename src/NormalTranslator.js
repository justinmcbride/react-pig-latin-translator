const NormalTranslator = ({animatingWords, pigLatinOutput}) => {
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
