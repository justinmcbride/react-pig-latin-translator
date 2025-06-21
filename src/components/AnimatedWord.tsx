"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, useAnimate } from "motion/react";
import useMeasure from "react-use-measure";

interface AnimatedWordProps {
  leadingConsonants: string;
  trailingEnd: string;
  suffix: string;
  originalWord: string;
  translatedWord: string;
  onAnimationComplete?: (originalWord: string) => void;
}

const AnimatedWord = ({
  leadingConsonants,
  trailingEnd,
  suffix,
  originalWord,
  translatedWord,
  onAnimationComplete,
}: AnimatedWordProps) => {
  leadingConsonants = leadingConsonants.toLowerCase();
  trailingEnd = trailingEnd.toLowerCase();
  suffix = suffix.toLowerCase();
  originalWord = originalWord.toLowerCase();
  translatedWord = translatedWord.toLowerCase();

  const [leadingRef, leadingBounds] = useMeasure();
  const [trailingRef, trailingBounds] = useMeasure();
  const [suffixRef, suffixBounds] = useMeasure();

  const [hasRunAnimation, setHasRunAnimation] = useState(false);

  const [scope, animate] = useAnimate();

  // Helper function to safely animate elements
  const safeAnimate = useCallback(
    (selector: string, values: any, options?: any) => {
      // Check if the component is still mounted and elements exist
      if (!scope.current) {
        return Promise.resolve();
      }
      
      const element = scope.current.querySelector(selector);
      if (!element) {
        return Promise.resolve();
      }
      
      return animate(selector, values, options);
    },
    [animate, scope]
  );

  const doAnimations = useCallback(async () => {
    if (
      leadingBounds.width === 0 &&
      trailingBounds.width === 0 &&
      suffixBounds.width === 0
    ) {
      return;
    }
    setHasRunAnimation(true);

    // Check if scope is still mounted before proceeding
    if (!scope.current) {
      return;
    }

    // instantly shift the leadingConsonants and trailingEnd to their starting positions,
    // which is offset to the right by the suffix's width
    await Promise.all([
      safeAnimate(
        "#leading",
        {
          x: suffixBounds.width,
        },
        { duration: 0 }
      ),
      safeAnimate(
        "#trailing",
        {
          x: suffixBounds.width,
        },
        { duration: 0 }
      ),
    ]);

    const yDistance = leadingBounds.height / 2;

    // in parallel: make both leadingConsonants and trailingEnd visible
    const visibilityDuration = 0.2;
    await Promise.all([
      safeAnimate(
        "#leading",
        {
          opacity: 1,
        },
        { duration: visibilityDuration }
      ),
      safeAnimate(
        "#trailing",
        {
          opacity: 1,
        },
        { duration: visibilityDuration }
      ),
    ]);

    // in parallel: move leadingConsonants and trailingEnd to their new word positions

    await Promise.all([
      safeAnimate(
        "#leading",
        {
          x: trailingBounds.width + suffixBounds.width,
          y: [0, yDistance, 0],
        },
        { duration: 1 }
      ),
      safeAnimate(
        "#trailing",
        {
          x: -leadingBounds.width + suffixBounds.width,
          y: [0, -yDistance, 0],
        },
        { duration: 1 }
      ),
    ]);

    // shift both leadingConsonants and trailingEnd to their final positions
    await Promise.all([
      safeAnimate(
        "#leading",
        {
          x: trailingBounds.width,
        },
        { duration: 0.2 }
      ),
      safeAnimate(
        "#trailing",
        {
          x: -leadingBounds.width,
        },
        { duration: 0.2 }
      ),
    ]);

    await Promise.all([
      safeAnimate(
        "#suffix",
        {
          opacity: 1,
          x: 0,
        },
        { duration: 0.75 }
      ),
    ]);

    onAnimationComplete?.(originalWord);
  }, [leadingBounds, trailingBounds, suffixBounds, onAnimationComplete, originalWord, scope, safeAnimate]);

  useEffect(() => {
    if (!hasRunAnimation) doAnimations();
  }, [doAnimations, hasRunAnimation]);

  const partialsSizeClass = "text-4xl";

  return (
    <div ref={scope}>
      <div className="flex flex-row pointer-events-none select-none justify-center gap-0">
        <motion.span
          id="leading"
          ref={leadingRef}
          className={partialsSizeClass}
          initial={{ opacity: 0 }}
        >
          {leadingConsonants}
        </motion.span>
        <motion.span
          id="trailing"
          ref={trailingRef}
          className={partialsSizeClass}
          initial={{ opacity: 0 }}
        >
          {trailingEnd}
        </motion.span>
        <motion.span
          id="suffix"
          ref={suffixRef}
          className={partialsSizeClass}
          initial={{ opacity: 0 }}
        >
          {suffix}
        </motion.span>
      </div>
    </div>
  );
};

export { AnimatedWord };
