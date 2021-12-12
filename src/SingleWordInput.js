import { useState } from 'react';

import styled from 'styled-components';

const InputBox = styled.input`
  color: black;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 20px 20px;
  text-align: center;
`;

const SingleWordInput = ({isDisabled, onSubmitWord}) => {
  const [englishInput, setEnglishInput] = useState(``);

  const handleChange = (e) => {
    const currentInputText = e.target.value;
    const trimmedInput = currentInputText.trimStart();

    if (trimmedInput.length === 0) {
      setEnglishInput(``);
      return;
    }

    const wholeInputWord = trimmedInput.trimEnd();
    if (wholeInputWord.length !== trimmedInput.length) {
      console.log(`Word completed: [${wholeInputWord}]`);
      setEnglishInput(``);
      onSubmitWord(wholeInputWord);
      
      return;
    }

    setEnglishInput(trimmedInput);
  }

  return (
    <InputBox
      value={englishInput}
      type="text"
      onChange={handleChange}
      disabled={isDisabled}
      placeholder="This little piggy went to market..."
    />
  );
};

export default SingleWordInput;
