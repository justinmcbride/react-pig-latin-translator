"use client";

import englishToPigLatin from "@/lib/translator";
import { motion, useAnimate } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import useMeasure from "react-use-measure";

interface StepThroughWordProps {
  originalWord: string;
}

const StepThroughWord = ({ originalWord }: StepThroughWordProps) => {
  let { leadingConsonants, trailingEnd, suffix, translatedWord } =
    englishToPigLatin(originalWord);
  leadingConsonants = leadingConsonants.toLowerCase();
  trailingEnd = trailingEnd.toLowerCase();

  const firstVowel = trailingEnd[0];
  trailingEnd = trailingEnd.slice(1);

  suffix = suffix.toLowerCase();
  originalWord = originalWord.toLowerCase();
  translatedWord = translatedWord.toLowerCase();

  const [leadingRef, leadingBounds] = useMeasure();
  const [vowelRef, vowelBounds] = useMeasure();
  const [trailingRef, trailingBounds] = useMeasure();
  const [suffixRef, suffixBounds] = useMeasure();
  const [scope, animate] = useAnimate();

  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = useMemo(() => {
    const isFullAnimation = leadingConsonants.length > 0;
    const steps: (() => Promise<void>)[] = [];

    // highlight the vowel
    steps.push(async () => {
      await animate("#vowel", { scale: 1.5 });
      await animate("#vowel", { scale: 1 });
    });

    if (isFullAnimation) {
      // move the leading consonants down
      steps.push(async () => {
        await animate(
          "#leading",
          {
            y: leadingBounds.height,
          },
          { duration: 0.5 }
        );
      });

      // swap the halves around
      steps.push(async () => {
        await Promise.all([
          animate(
            "#vowel",
            {
              x: -leadingBounds.width,
            },
            { duration: 0.5 }
          ),
          animate(
            "#trailing",
            {
              x: -leadingBounds.width,
            },
            { duration: 0.5 }
          ),
          animate(
            "#leading",
            {
              x: vowelBounds.width + trailingBounds.width,
            },
            { duration: 0.5 }
          ),
        ]);
      });

      // move the leading consonants back up
      steps.push(async () => {
        await animate(
          "#leading",
          {
            y: 0,
          },
          { duration: 0.5 }
        );
      });
    }

    // // move everything over to make room for the suffix
    // steps.push(async () => {
    //   await Promise.all([
    //     animate(
    //       "#vowel",
    //       {
    //         x: -suffixBounds.width - leadingBounds.width,
    //       },
    //       { duration: 0.5 }
    //     ),
    //     animate(
    //       "#trailing",
    //       {
    //         x: -suffixBounds.width - leadingBounds.width,
    //       },
    //       { duration: 0.5 }
    //     ),
    //     animate(
    //       "#leading",
    //       {
    //         x: -suffixBounds.width + vowelBounds.width + trailingBounds.width,
    //       },
    //       { duration: 0.5 }
    //     ),
    //   ]);
    // });

    // reveal the new suffix
    steps.push(async () => {
      await Promise.all([
        // animate(
        //   "#suffix",
        //   {
        //     x: leadingBounds.width,
        //   },
        //   { duration: 0 }
        // ),
        animate(
          "#suffix",
          {
            opacity: 1,
          },
          { duration: 0.75 }
        ),
      ]);
    });

    return steps;
  }, [animate, leadingBounds, trailingBounds, vowelBounds, leadingConsonants]);

  const resetAnimations = useCallback(async () => {
    await animate("#leading", { x: 0, y: 0 }, { duration: 0 });
    await animate("#vowel", { x: 0 }, { duration: 0 });
    await animate("#trailing", { x: 0 }, { duration: 0 });
    await animate("#suffix", { x: 0, opacity: 0 }, { duration: 0 });

    setCurrentStep(0);
  }, [animate]);

  const handleNext = useCallback(async () => {
    setIsAnimating(true);
    await steps[currentStep]();
    setCurrentStep((prevStep) => prevStep + 1);
    setIsAnimating(false);
  }, [currentStep, steps]);

  const handleReset = useCallback(async () => {
    await resetAnimations();
    setCurrentStep(0);
  }, [resetAnimations]);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div ref={scope} className="relative flex-1">
          <div className="flex flex-row pointer-events-none select-none justify-start gap-0 text-7xl lg:text-9xl font-bold text-white drop-shadow-2xl">
            <motion.span id="leading" ref={leadingRef} className="text-pink-300">
              {leadingConsonants}
            </motion.span>

            <motion.span id="vowel" ref={vowelRef} className="text-yellow-300">
              {firstVowel}
            </motion.span>

            <motion.span id="trailing" ref={trailingRef} className="text-blue-300">
              {trailingEnd}
            </motion.span>
            <motion.span id="suffix" ref={suffixRef} initial={{ opacity: 0 }} className="text-green-300">
              {suffix}
            </motion.span>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          {currentStep === steps.length ? (
            <button
              onClick={handleReset}
              disabled={isAnimating}
              className="rounded-xl px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
            >
              🔄 Reset
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="rounded-xl px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
            >
              ➡️ Step {currentStep + 1} of {steps.length}
            </button>
          )}
          
          <div className="text-white/60 text-sm text-center">
            <span className="inline-block w-2 h-2 rounded-full bg-pink-300 mr-1"></span>
            Consonants
            <span className="mx-3">•</span>
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-300 mr-1"></span>
            Vowels
            <span className="mx-3">•</span>
            <span className="inline-block w-2 h-2 rounded-full bg-green-300 mr-1"></span>
            Suffix
          </div>
        </div>
      </div>
    </div>
  );
};

export { StepThroughWord };
