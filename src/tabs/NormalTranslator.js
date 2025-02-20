"use client";

import { useState } from "react";

import translator from "@/lib/translator";
import SingleWordInput from "@/components/SingleWordInput";

//   100%{
//     opacity: 0;
//     position: fixed;
//     z-index: -5;
//   }

const NormalTranslator = () => {
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [animatingWords, setAnimatingWords] = useState([]);

  const handleSubmitWord = (inputWord) => {
    console.log(`handleSubmitWord: inputWord=[${inputWord}]`);

    const translatedWord = translator(inputWord);

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
      <div className="h-5">
        {animatingWords.map((word, index) => {
          return (
            <div
              key={index}
              className=" text-red-600 p-10 animate-fade animate-infinite animate-duration-[3000ms] animate-ease-linear animate-reverse"
            >
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NormalTranslator;
