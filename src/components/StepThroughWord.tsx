"use client";

import { useEffect, useCallback, useState, useMemo } from "react";
import { motion, useAnimate } from "motion/react";
import useMeasure from "react-use-measure";

interface StepThroughWordProps {
  leadingConsonants: string;
  trailingEnd: string;
  suffix: string;
  originalWord: string;
  translatedWord: string;
}

const StepThroughWord = ({
  leadingConsonants,
  trailingEnd,
  suffix,
  originalWord,
  translatedWord,
}: StepThroughWordProps) => {
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

  const [isDone, setIsDone] = useState(false);

  const doAnimations = useCallback(
    async function* () {
      const yDistance = leadingBounds.height;

      const widthLeading = leadingBounds.width;
      const widthVowel = vowelBounds.width;
      const widthTrailing = trailingBounds.width;
      const widthBackHalf = widthVowel + widthTrailing;
      const widthSuffix = suffixBounds.width;

      const highlightVowel = async () => {
        await animate("#vowel", { scale: 1.5 });
        await animate("#vowel", { scale: 1 });
      };
      yield await highlightVowel();

      //move the leadingConsonants down
      yield await animate(
        "#leading",
        {
          y: yDistance,
        },
        { duration: 0.5 }
      );

      // move the vowel and trailingEnd left
      yield await Promise.all([
        animate(
          "#vowel",
          {
            x: -widthLeading,
          },
          { duration: 0.5 }
        ),
        animate(
          "#trailing",
          {
            x: -widthLeading,
          },
          { duration: 0.5 }
        ),
// move the leadingConsonants to the right
        animate(
          "#leading",
          {
            x: widthBackHalf,
          },
          { duration: 0.5 }
        )
      ]);
      
      // move the leadingConsonants up
      yield await animate(
        "#leading",
        {
          y: 0,
        },
        { duration: 0.5 }
      );

      // move the vowel, trailing, and leading to the left
      yield await Promise.all([
        animate(
          "#vowel",
          {
            x: -widthSuffix - widthLeading,
          },
          { duration: 0.5 }
        ),
        animate(
          "#trailing",
          {
            x: -widthSuffix - widthLeading,
          },
          { duration: 0.5 }
        ),
        animate(
          "#leading",
          {
            x: -widthSuffix + widthBackHalf,
          },
          { duration: 0.5 }
        ),
      ]);


      // show the suffix
      await Promise.all([
        animate(
          "#suffix",
          {
            x: widthLeading,
          },
          { duration: 0 }
        ),
        animate(
          "#suffix",
          {
            opacity: 1,
          },
          { duration: 0.75 }
        ),
      ]);

      setIsDone(true);
    },
    [animate, suffixBounds, leadingBounds, trailingBounds, vowelBounds]
  );

  const iterator = useMemo(() => doAnimations(), [doAnimations]);

  const handleNext = useCallback(async () => {
    if (isDone) {
      return;
    }
    iterator.next();
  }, [iterator, isDone]);

  return (
    <div>
      <button
        onClick={handleNext}
        className="rounded p-2 bg-blue-500 text-white"
      >
        {isDone ? "Reset" : "Next"}
      </button>
      <div ref={scope} className="relative">
        <div className="flex flex-row pointer-events-none select-none justify-center gap-0">
          <motion.span
            id="leading"
            ref={leadingRef}
            className="text-4xl"
          >
            {leadingConsonants}
          </motion.span>

          <motion.span
            id="vowel"
            ref={vowelRef}
            className="text-4xl"
          >
            {firstVowel}
          </motion.span>

          <motion.span
            id="trailing"
            ref={trailingRef}
            className="text-4xl"
          >
            {trailingEnd}
          </motion.span>
          <motion.span
            id="suffix"
            ref={suffixRef}
            className="text-4xl absolute"
            initial={{ opacity: 0 }}
          >
            {suffix}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export { StepThroughWord };
