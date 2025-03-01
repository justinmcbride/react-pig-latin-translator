"use client";

import { useState } from "react";

import translator from "@/lib/translator";
import SingleWordInput from "@/components/SingleWordInput";

const NormalTranslator = () => {
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [animatingWords, setAnimatingWords] = useState([]);

  const handleSubmitWord = (inputWord) => {
    console.log(`handleSubmitWord: inputWord=[${inputWord}]`);

    inputWord = inputWord.trim();
    if (inputWord.length === 0) {
      return;
    }

    const translationResult = translator(inputWord);
    const {
      translatedWordStem,
      suffix,
      firstVowelIndex,
      translatedWord,
    } = translationResult;

    // Because this can be called into a loop, and we want to ensure that ALL
    // updates to the state aren't batched into a single call, use the state
    // updater syntax. https://stackoverflow.com/a/66560573/4493426
    setPigLatinOutput((previousState) => `${previousState} ${translatedWord}`);
    setAnimatingWords((previousState) => [...previousState, translatedWord]);

    console.log(
      `handleSubmitWord: inputWord=[${inputWord}] translatedWord=[${translatedWord}]`
    );
  };

  return (
    <div>
      <SingleWordInput onSubmitWord={handleSubmitWord} />
      <div className="text-white font-lg">{pigLatinOutput}</div>
    </div>
  );
};

export default NormalTranslator;
