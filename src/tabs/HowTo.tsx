"use client";

import { StepThroughWord } from "@/components/StepThroughWord";

const HowTo = () => {
  return (
    <div>
      <p className="text-white font-bold text-lg">It is simple! Here are the rules:</p>

      <p><span className="text-white font-bold">1.</span> Find the first vowel in the word.</p>
      <p>
      <span className="text-white font-bold">2.</span> If the first letter is a vowel, simply add &ldquo;yay&rdquo; to the end of the word.
      </p>
      <p>
      <span className="text-white font-bold">3.</span> Any letters before the first vowel move to the end of the word, and
        add &ldquo;ay&rdquo; to the end.
      </p>

      <StepThroughWord originalWord={"hello"} />
      <StepThroughWord originalWord={"example"} />
    </div>
  );
};

export { HowTo };
