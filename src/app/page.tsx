"use client";

import { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { NormalTranslator } from "@/tabs/NormalTranslator";
import { GameMode } from "@/tabs/GameMode";

import "react-tabs/style/react-tabs.css";
import { SpinningPig } from "@/components/SpinningPig";
import { HowTo } from "@/tabs/HowTo";

export default function Page() {
  const [pigSpinSpeed, setPigSpinSpeed] = useState(20000);

  const increasePigSpinSpeed = () => {
    setPigSpinSpeed(pigSpinSpeed * 0.8);
  };

  const selectedTabClassName = "bg-pink-500 text-white rounded-t-xl shadow-lg";

  return (
    <div className="w-full flex flex-col justify-center items-center text-center px-4 py-8">
      <header className="text-5xl font-bold mb-8 text-white drop-shadow-lg">
        Translate English to Pig Latin
      </header>
      <SpinningPig pigSpinSpeed={pigSpinSpeed} />
      <div className="w-full max-w-6xl">
        <Tabs className="text-lg" selectedTabClassName={selectedTabClassName}>
          <TabList className="flex space-x-2 mb-6 bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/20 shadow-lg">
            <Tab className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-white/10 cursor-pointer outline-none">
              Translate
            </Tab>
            <Tab className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-white/10 cursor-pointer outline-none">
              Game
            </Tab>
            <Tab className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-white/10 cursor-pointer outline-none">
              Teach me!
            </Tab>
          </TabList>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl">
            <TabPanel>
              <NormalTranslator />
            </TabPanel>
            <TabPanel>
              <GameMode increasePigSpinSpeed={increasePigSpinSpeed} />
            </TabPanel>
            <TabPanel>
              <HowTo />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
