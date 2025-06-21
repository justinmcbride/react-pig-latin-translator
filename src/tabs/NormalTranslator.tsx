"use client";

import { useCallback, useState, useRef } from "react";

import translator from "@/lib/translator";
import type { TranslationResult } from "@/lib/translator";
import { SingleWordInput } from "@/components/SingleWordInput";
import { AnimatedWord } from "@/components/AnimatedWord";

const NormalTranslator = () => {
  const [pigLatinOutput, setPigLatinOutput] = useState(``);
  const [animatingWord, setAnimatingWord] = useState<TranslationResult[]>([]);
  const animationKeyRef = useRef(0);

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
    animationKeyRef.current += 1;

    console.log(
      `handleSubmitWord: inputWord=[${inputWord}] translatedWord=[${translatedWord}]`,
      translationResult
    );
  }, []);

  const handleAnimationComplete = useCallback(
    (originalWord: string) => {
      console.log(
        `handleAnimationComplete: originalWord=[${originalWord}]`
      );
      setAnimatingWord((prev) => {
        if (prev.length === 0) {
          return [];
        }
        
        // Verify that the completed animation matches the first item in queue
        if (prev[0]?.originalWord === originalWord) {
          return prev.slice(1);
        }
        
        // If there's a mismatch, log it but still remove the first item
        console.warn(`Animation completed for ${originalWord} but expected ${prev[0]?.originalWord}`);
        return prev.slice(1);
      });
    },
    [] // Remove animatingWord from dependencies to prevent callback recreation
  );

  return (
    <div className="space-y-6">
      <SingleWordInput isDisabled={false} onSubmitWord={handleSubmitWord} />
      
      {pigLatinOutput && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold text-pink-300 mb-4 flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-pink-400 mr-3"></span>
            Pig Latin Translation:
          </h3>
          <p className="text-white text-2xl font-medium break-words leading-relaxed bg-white/5 rounded-lg p-4 border border-white/10">
            {pigLatinOutput.trim()}
          </p>
        </div>
      )}
      
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
        <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-3"></span>
          Word Animation:
        </h3>
        <div className="min-h-[100px] flex items-center justify-center">
          {animatingWord.length > 0 ? (
            <AnimatedWord
              key={`${animatingWord[0].originalWord}-${animationKeyRef.current}`}
              {...animatingWord[0]}
              onAnimationComplete={handleAnimationComplete}
            />
          ) : (
            <p className="text-white/60 text-lg italic">
              Type a word above to watch it get translated!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export { NormalTranslator };
