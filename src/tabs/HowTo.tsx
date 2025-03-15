"use client";

import { useCallback, useState } from "react";

import translator from "@/lib/translator";
import type { TranslationResult } from "@/lib/translator";
import { SingleWordInput } from "@/components/SingleWordInput";
import { AnimatedWord } from "@/components/AnimatedWord";
import { StepThroughWord } from "@/components/StepThroughWord";

const HowTo = () => {
  return (
    <div>
      <div>Translating from English to Pig Latin is easier than you think!</div>
      <div>Here are the rules:</div>
      <div>Find the first vowel in the word.</div>
      <div>
        If the first letter is a vowel, simply add &ldquo;yay&rdquo; to the end of the word.
      </div>
      <div>
        Any letters before the first vowel are considered consonants. Move the consonants to the end of the word, and
        add &ldquo;ay&rdquo; to the end.
      </div>
      <div>For example:</div>
      <div>English: &ldquo;hello&rdquo;</div>
      <div>Pig Latin: &ldquo;ellohay&rdquo;</div>
      <StepThroughWord leadingConsonants={"h"} trailingEnd={"ello"} suffix={"ay"} originalWord={"hello"} translatedWord={"ellohay"} />

    </div>
  );
};

export { HowTo };
