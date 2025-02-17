import {useState} from 'react';

import translator from '@/lib/translator';
import SingleWordInput from '@/components/SingleWordInput';

// const OutputAnimation = keyframes`
//   0% {
//     color: white;
//   }
//   99% {
//     color:#f34079;
//   }
//   100%{
//     opacity: 0;
//     position: fixed;
//     z-index: -5;
//   }
// `;

// const AnimatedWord = styled.div`
//   animation: ${OutputAnimation} 4s ease-out forwards;
// `;

const NormalTranslator = () => {
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [animatingWords, setAnimatingWords] = useState([]);

  const handleSubmitWord = (inputWord) => {
    console.log(`handleSubmitWord: inputWord=[${inputWord}]`);

    const translatedWord = translator(inputWord);

    // Because this can be called into a loop, and we want to ensure that ALL
    // updates to the state aren't batched into a single call, use the state
    // updater syntax. https://stackoverflow.com/a/66560573/4493426
    setPigLatinOutput(previousState => `${previousState} ${translatedWord}`);
    setAnimatingWords(previousState => [...previousState, translatedWord]);

    console.log(`handleSubmitWord: inputWord=[${inputWord}] translatedWord=[${translatedWord}]`);
  }

  const animatedWords = [];
  for (const word of animatingWords) {
    animatedWords.push(<div>{word}</div>);
  }

  return (
    <div>
      <SingleWordInput onSubmitWord={handleSubmitWord}/>
      <div className="text-white font-lg">{pigLatinOutput}</div>
      <div className="h-5">{animatedWords}</div>
    </div>
  )
}

export default NormalTranslator;
