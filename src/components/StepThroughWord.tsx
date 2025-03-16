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
  suffix = suffix.toLowerCase();
  originalWord = originalWord.toLowerCase();
  translatedWord = translatedWord.toLowerCase();

  const [leadingRef, leadingBounds] = useMeasure();
  const [trailingRef, trailingBounds] = useMeasure();
  const [suffixRef, suffixBounds] = useMeasure();
  const [scope, animate] = useAnimate();

  const [isDone, setIsDone] = useState(false);

  const doAnimations = useCallback(async function* () {
    const yDistance = leadingBounds.height / 2;

    // in parallel: make both leadingConsonants and trailingEnd visible
    const visibilityDuration = 0.2;
    yield await Promise.all([
      animate(
        "#leading",
        {
          opacity: 1,
        },
        { duration: visibilityDuration }
      ),
      animate(
        "#trailing",
        {
          opacity: 1,
        },
        { duration: visibilityDuration }
      ),
    ]);

    // in parallel: move leadingConsonants and trailingEnd to their new word positions

    yield await Promise.all([
      animate(
        "#leading",
        {
          x: trailingBounds.width + suffixBounds.width,
          y: [0, yDistance, 0],
        },
        { duration: 1 }
      ),
      animate(
        "#trailing",
        {
          x: -leadingBounds.width + suffixBounds.width,
          y: [0, -yDistance, 0],
        },
        { duration: 1 }
      ),
    ]);

    // shift both leadingConsonants and trailingEnd to their final positions
    yield await Promise.all([
      animate(
        "#leading",
        {
          x: trailingBounds.width,
        },
        { duration: 0.2 }
      ),
      animate(
        "#trailing",
        {
          x: -leadingBounds.width,
        },
        { duration: 0.2 }
      ),
    ]);
    

    yield await Promise.all([
      animate(
        "#suffix",
        {
          opacity: 1,
          x: 0,
        },
        { duration: 0.75 }
      ),
    ]);

    setIsDone(true);
  }, [animate, suffixBounds, leadingBounds, trailingBounds]);

  const iterator = useMemo(() => doAnimations(), [doAnimations]);

  const handleNext = useCallback(async() => {
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
      <div ref={scope}>
        <div className="flex flex-row pointer-events-none select-none justify-center gap-0">
          <motion.span
            id="leading"
            ref={leadingRef}
            className={"text-4xl"}
            initial={{
              x: suffixBounds.width,
            }}
          >
            {leadingConsonants}
          </motion.span>
          <motion.span
            id="trailing"
            ref={trailingRef}
            className={"text-4xl"}
            initial={{x: suffixBounds.width,}}
          >
            {trailingEnd}
          </motion.span>
          <motion.span
            id="suffix"
            ref={suffixRef}
            className={"text-4xl"}
            initial={{opacity: 0}}
          >
            {suffix}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export { StepThroughWord };
