"use client";

import { useState } from "react";

import translator from "@/lib/translator";
import type {TranslationResult} from "@/lib/translator";
import SingleWordInput from "@/components/SingleWordInput";
import { AnimatedWord } from "@/components/AnimatedWord";

const NormalTranslator = () => {
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [animatingWord, setAnimatingWord] = useState<TranslationResult | null>(null);

  const handleSubmitWord = (inputWord: string) => {
    console.log(`handleSubmitWord: inputWord=[${inputWord}]`);

    inputWord = inputWord.trim();
    if (inputWord.length === 0) {
      return;
    }

    const translationResult = translator(inputWord);
    const { translatedWord } = translationResult;

    // Because this can be called within a loop, and we want to ensure that ALL
    // updates to the state aren't batched into a single call, use the state
    // updater syntax. https://stackoverflow.com/a/66560573/4493426
    setPigLatinOutput((previousState) => `${previousState} ${translatedWord}`);
    setAnimatingWord(() => ({ ...translationResult, originalWord: inputWord }));

    console.log(
      `handleSubmitWord: inputWord=[${inputWord}] translatedWord=[${translatedWord}]`,
      translationResult
    );
  };


  return (
    <div>
      <SingleWordInput isDisabled={false} onSubmitWord={handleSubmitWord} />
      <div className="text-white font-lg">{pigLatinOutput}</div>
      {animatingWord && (
        <AnimatedWord
          key={`${animatingWord?.originalWord}-${pigLatinOutput.length}`}
          {...animatingWord}
        />
      )}
    </div>
  );
};

export default NormalTranslator;
