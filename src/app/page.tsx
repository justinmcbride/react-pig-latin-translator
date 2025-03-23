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

  const selectedTabClassName = "bg-[pink] text-black rounded-t-lg";

  return (
    <div className="w-full flex flex-col justify-center items-center text-center">
      <header className="text-4xl text-bold">Translate English to Pig Latin</header>
      <SpinningPig pigSpinSpeed={pigSpinSpeed} />
      <div className="min-w-[60%]">
        <Tabs className="text-md" selectedTabClassName={selectedTabClassName}>
          <TabList>
            <Tab>Translate</Tab>
            <Tab>Game</Tab>
            <Tab>Teach me!</Tab>
          </TabList>
          <TabPanel>
            <NormalTranslator />
          </TabPanel>
          <TabPanel>
            <GameMode increasePigSpinSpeed={increasePigSpinSpeed} />
          </TabPanel>
          <TabPanel>
            <HowTo />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
