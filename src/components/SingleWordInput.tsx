import { useState, forwardRef } from "react";

/*
Even though this component is called "SingleWordInput", multiple words can actually be entered.
The concept is that only one word at a time is allowed, and that's determined by entering a space.
However, users can paste text that has multiple words. So we handle both cases in this component.
*/

interface SingleWordInputProps {
  isDisabled: boolean;
  onSubmitWord: (word: string) => void;
}

const SingleWordInput = forwardRef<HTMLInputElement, SingleWordInputProps>(({
  isDisabled,
  onSubmitWord,
}, ref) => {
  const [englishInput, setEnglishInput] = useState(``);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allInputText = e.target.value;

    const splitInputText = allInputText.split(" ");
    if (splitInputText.length === 1) {
      setEnglishInput(splitInputText[0]);
    } else {
      for (const currentInputText of splitInputText) {
        if (currentInputText.length === 0) {
          continue;
        }
        console.log(`Word completed: [${currentInputText}]`);
        setEnglishInput(``);
        onSubmitWord(currentInputText);
      }
    }
  };

  return (
    <input
      ref={ref}
      value={englishInput}
      type="text"
      onChange={handleChange}
      disabled={isDisabled}
      placeholder={
        isDisabled
          ? "... but got cooked."
          : "This little piggy went to market..."
      }
      className="bg-white/10 backdrop-blur-sm text-white placeholder-white/60 w-full rounded-xl p-5 text-center text-2xl border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
});

SingleWordInput.displayName = 'SingleWordInput';

export { SingleWordInput };
