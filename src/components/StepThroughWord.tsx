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
    <div className="flex flex-row gap-4 items-center">
      <div ref={scope} className="relative">
        <div className="flex flex-row pointer-events-none select-none justify-center gap-0 text-9xl">
          <motion.span id="leading" ref={leadingRef}>
            {leadingConsonants}
          </motion.span>

          <motion.span id="vowel" ref={vowelRef}>
            {firstVowel}
          </motion.span>

          <motion.span id="trailing" ref={trailingRef}>
            {trailingEnd}
          </motion.span>
          <motion.span id="suffix" ref={suffixRef} initial={{ opacity: 0 }}>
            {suffix}
          </motion.span>
        </div>
      </div>
      {currentStep === steps.length ? (
        <button
          onClick={handleReset}
          disabled={isAnimating}
          className="rounded p-2 bg-blue-500 text-white"
        >
          Reset
        </button>
      ) : (
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="rounded p-2 bg-blue-500 text-white disabled:bg-blue-200"
        >
          {`➡️ [${currentStep}/${steps.length}]`}
        </button>
      )}
    </div>
  );
};

export { StepThroughWord };
