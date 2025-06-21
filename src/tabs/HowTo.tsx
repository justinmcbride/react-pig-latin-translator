"use client";

import { StepThroughWord } from "@/components/StepThroughWord";

const HowTo = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-white font-bold text-2xl mb-6 drop-shadow-lg">
          It&apos;s simple! Here are the rules:
        </h2>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-white/20 shadow-lg">
        <div className="flex items-start space-x-3">
          <span className="text-pink-300 font-black text-xl bg-pink-500/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 border border-pink-300/30">
            1
          </span>
          <p className="text-white/90 text-lg leading-relaxed">
            Find the first vowel in the word.
          </p>
        </div>
        
        <div className="flex items-start space-x-3">
          <span className="text-blue-300 font-black text-xl bg-blue-500/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 border border-blue-300/30">
            2
          </span>
          <p className="text-white/90 text-lg leading-relaxed">
            If the first letter is a vowel, simply add <span className="text-yellow-300 font-semibold bg-yellow-500/20 px-2 py-1 rounded">&ldquo;yay&rdquo;</span> to the end of the word.
          </p>
        </div>
        
        <div className="flex items-start space-x-3">
          <span className="text-green-300 font-black text-xl bg-green-500/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 border border-green-300/30">
            3
          </span>
          <p className="text-white/90 text-lg leading-relaxed">
            Any letters before the first vowel move to the end of the word, and add <span className="text-yellow-300 font-semibold bg-yellow-500/20 px-2 py-1 rounded">&ldquo;ay&rdquo;</span> to the end.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-white/80 font-semibold text-xl text-center">
          Try these examples:
        </h3>
        <div className="space-y-8">
          <StepThroughWord originalWord={"hello"} />
          <StepThroughWord originalWord={"example"} />
        </div>
      </div>
    </div>
  );
};

export { HowTo };
