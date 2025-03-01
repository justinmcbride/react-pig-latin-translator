"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, useAnimate } from "motion/react";
import useMeasure from "react-use-measure";

const AnimatedWord = ({
  leadingConsonants,
  trailingEnd,
  suffix,
  originalWord,
  translatedWord,
}) => {
  leadingConsonants = leadingConsonants.toLowerCase();
  trailingEnd = trailingEnd.toLowerCase();
  suffix = suffix.toLowerCase();
  originalWord = originalWord.toLowerCase();
  translatedWord = translatedWord.toLowerCase();

  const [leadingRef, leadingBounds] = useMeasure();
  const [trailingRef, trailingBounds] = useMeasure();

  const [hasRunAnimation, setHasRunAnimation] = useState(false);

  const [scope, animate] = useAnimate();

  const doAnimations = useCallback(async () => {
    if (leadingBounds.width === 0 || trailingBounds.width === 0) {
      return;
    }
    setHasRunAnimation(true);

    const yDistance = leadingBounds.height / 2;

    await animate(
      "#fullOriginal",
      {
        opacity: 0,
      },
      { duration: 2 }
    );

    // in parallel: make both leadingConsonants and trailingEnd visible
    const visibilityDuration = 3;
    await Promise.all([
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

    // in parallel: move leadingConsonants and trailingEnd to their final positions

    await Promise.all([
      animate(
        "#leading",
        {
          x: leadingBounds.width,
          y: [0, yDistance, 0],
        },
        { duration: 1 }
      ),
      animate(
        "#trailing",
        {
          x: -trailingBounds.width,
          y: [0, -yDistance, 0],
        },
        { duration: 1 }
      ),
    ]);

    await animate(
      "#suffix",
      {
        opacity: 1,
      },
      { duration: 1 }
    );

    // in parallel: hide leadingConsonants and trailingEnd and suffix, and make translatedWord visible
    const hideDuration = 1;
    await Promise.all([
      animate(
        "#leading",
        {
          opacity: 0,
        },
        { duration: hideDuration }
      ),
      animate(
        "#trailing",
        {
          opacity: 0,
        },
        { duration: hideDuration }
      ),
      animate(
        "#suffix",
        {
          opacity: 0,
        },
        { duration: hideDuration }
      ),
      animate(
        "#fullTranslated",
        {
          opacity: 1,
        },
        { duration: hideDuration }
      ),
    ]);
  }, [leadingBounds, trailingBounds, animate]);

  useEffect(() => {
    if (!hasRunAnimation) doAnimations();
  }, [doAnimations, hasRunAnimation]);

  return (
    <div ref={scope}>
      <div className="flex flex-row pointer-events-none select-none justify-center">
        <motion.div id="fullOriginal" className="z-10 absolute">
          {originalWord}
        </motion.div>
        <motion.div
          id="fullTranslated"
          className="z-20 absolute"
          initial={{ opacity: 0 }}
        >
          {translatedWord}
        </motion.div>
        <motion.div
          id="leading"
          ref={leadingRef}
          className="w-10 h-10 rounded"
          initial={{ opacity: 0 }}
        >
          {leadingConsonants}
        </motion.div>
        <motion.div
          id="trailing"
          ref={trailingRef}
          className="w-10 h-10 rounded"
          initial={{ opacity: 0 }}
        >
          {trailingEnd}
        </motion.div>
        <motion.div
          id="suffix"
          className="w-10 h-10 rounded"
          initial={{ opacity: 0 }}
        >
          {suffix}
        </motion.div>
      </div>
    </div>
  );
};

export { AnimatedWord };

/*
    <div ref={scope} className="flex flex-row">
      <motion.div ref={leadingRef} className="w-10 h-10 rounded bg-yellow-200" animate={{ x: [0, leadingBounds.width], y: [0, leadingBounds.height, 0] }}>{leadingConsonants}</motion.div>
      <motion.div ref={trailingRef} className="w-10 h-10 rounded bg-yellow-200" animate={{ x: [0, -trailingBounds.width], y: [0, -trailingBounds.height, 0] }}>{trailingEnd}</motion.div>
      <motion.div className="w-10 h-10 rounded bg-yellow-200" animate={{ opacity: [0, 1], transition: { duration: 1 } }}>{suffix}</motion.div>
    </div>
*/

/*
    <ul className="list-style-type-none p-0 m-0 relative flex flex-wrap gap-3 w-full flex-row justify-center align-middle">
      {wordOrder.map((word, index) => {
        return (
          <motion.li
            key={index}
            layout
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            className="w-10 h-10 rounded bg-yellow-200"
          >
            {word}
          </motion.li>
        );
      })}
    </ul>

*/
