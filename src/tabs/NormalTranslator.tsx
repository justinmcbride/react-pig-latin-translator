"use client";

import { useCallback, useState } from "react";

import translator from "@/lib/translator";
import type { TranslationResult } from "@/lib/translator";
import { SingleWordInput } from "@/components/SingleWordInput";
import { AnimatedWord } from "@/components/AnimatedWord";

const NormalTranslator = () => {
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [animatingWord, setAnimatingWord] = useState<TranslationResult[]>([]);

  const handleSubmitWord = useCallback((inputWord: string) => {
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

    // Start animating the word
    setAnimatingWord((prev) => [...prev, translationResult]);

    console.log(
      `handleSubmitWord: inputWord=[${inputWord}] translatedWord=[${translatedWord}]`,
      translationResult
    );
  }, []);

  const handleAnimationComplete = useCallback(
    (originalWord: string) => {
      console.log(
        `handleAnimationComplete: originalWord=[${originalWord}] currentWord=[${animatingWord[0].originalWord}]`
      );
      setAnimatingWord((prev) => {
        if (prev.length === 0) {
          return [];
        }

        return prev.slice(1);
      });
    },
    [animatingWord]
  );

  return (
    <div>
      <SingleWordInput isDisabled={false} onSubmitWord={handleSubmitWord} />
      
      {pigLatinOutput && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Pig Latin Translation:</h3>
          <p className="text-white text-xl font-medium break-words leading-relaxed">
            {pigLatinOutput.trim()}
          </p>
        </div>
      )}
      
      {animatingWord.length > 0 && (
        <AnimatedWord
          key={`${animatingWord[0].originalWord}-${pigLatinOutput.length}`}
          {...animatingWord[0]}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </div>
  );
};

export { NormalTranslator };
