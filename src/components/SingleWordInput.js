import { useState } from 'react';

/*
Even though this component is called "SingleWordInput", multiple words can actually be entered.
The concept is that only one word at a time is allowed, and that's determined by entering a space.
However, users can paste text that has multiple words. So we handle both cases in this component.
*/

const SingleWordInput = ({isDisabled, onSubmitWord}) => {
  const [englishInput, setEnglishInput] = useState(``);

  const handleChange = (e) => {
    const allInputText = e.target.value;

    const splitInputText = allInputText.split(' ');
    if (splitInputText.length === 1) {
      setEnglishInput(splitInputText[0]);
    }
    else {
      for (const currentInputText of splitInputText) {
        if (currentInputText.length === 0) {
          continue;
        }
        console.log(`Word completed: [${currentInputText}]`);
        setEnglishInput(``);
        onSubmitWord(currentInputText);
      }
    }
  }

  return (
    <input
      value={englishInput}
      type="text"
      onChange={handleChange}
      disabled={isDisabled}
      placeholder="This little piggy went to market..."
      className="text-black w-full rounded p-5 text-center box-border"
    />
  );
};

export default SingleWordInput;
