"use client";

import { useState } from "react";
import { StepThroughWord } from "@/components/StepThroughWord";

const HowTo = () => {
  const exampleWords = [
    { word: "dragon", description: "Single consonant start - move 'd' to end" },
    { word: "awesome", description: "Vowel start - just add 'yay'" },
    { word: "thunder", description: "Consonant cluster - move 'th' to end" },
    { word: "epic", description: "Vowel start - add 'yay'" },
    { word: "squirrel", description: "Complex consonants - move 'squ' to end" },
    { word: "wizard", description: "Single consonant - move 'w' to end" }
  ];
  
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);

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
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {exampleWords.map((example, index) => (
              <button
                key={example.word}
                onClick={() => setSelectedWordIndex(index)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedWordIndex === index
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {example.word}
              </button>
            ))}
          </div>
          
          <div className="text-center mb-4">
            <p className="text-white/70 text-sm italic">
              {exampleWords[selectedWordIndex].description}
            </p>
          </div>
        </div>
        
        <StepThroughWord 
          key={exampleWords[selectedWordIndex].word} 
          originalWord={exampleWords[selectedWordIndex].word} 
        />
      </div>
    </div>
  );
};

export { HowTo };
