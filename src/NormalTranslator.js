import {useState} from 'react';

import axios from 'axios';
import _ from 'lodash';
import styled, {keyframes} from 'styled-components';

import OinkServer from './ServerInfo';
import SingleWordInput from './SingleWordInput';

const OutputAnimation = keyframes`
  0% {
    color: white;
  }
  99% {
    color:#f34079;
  }
  100%{
    opacity: 0;
    position: fixed;
    z-index: -5;
  }
`;

const AnimatedWord = styled.div`
  animation: ${OutputAnimation} 4s ease-out forwards;
`;

const AnimationContainer = styled.div`
  height: calc(20px + 2vmin);
`;

const TranslatedOutput = styled.div`
  color: white;
  height: calc(10px + 2vmin);
  font-size: calc(10px + 2vmin);
`;

const NormalTranslator = () => {
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [animatingWords, setAnimatingWords] = useState([]);

  const handleSubmitWord = (inputWord) => {
    requestTranslateWord(inputWord);
  }

  const requestTranslateWord = (wordToTranslate) => {
    console.log(`requestTranslateWord: wordToTranslate=[${wordToTranslate}]`);
    axios
      .get(`${OinkServer}/oink/${wordToTranslate}`)
      .then(res => {
        const response = res.data;
        if (!_.has(response, `stemChangeIndex`) || !_.has(response, `pigLatinWord`)) {
          console.error(`requestTranslateWord: bad response: response=[${JSON.stringify(response)}]`);
        }

        setPigLatinOutput(`${pigLatinOutput} ${response.pigLatinWord}`);

        setAnimatingWords([...animatingWords, response]);
        console.log(`requestTranslateWord: wordToTranslate=[${wordToTranslate}] stemChangeIndex=[${response.stemChangeIndex}] pigLatinWord=[${response.pigLatinWord}]`);
      })
      .catch(err => {
        console.error(`requestTranslateWord: failure: ${err}`);
      })
    ;
  };

  const animatedWords = [];
  for (const word of animatingWords) {
    animatedWords.push(<AnimatedWord>{word.pigLatinWord}</AnimatedWord>);
  }

  return (
    <div>
      <SingleWordInput onSubmitWord={handleSubmitWord}/>
      <TranslatedOutput>{pigLatinOutput}</TranslatedOutput>
      <AnimationContainer>{animatedWords}</AnimationContainer>
    </div>
  )
}

export default NormalTranslator;
