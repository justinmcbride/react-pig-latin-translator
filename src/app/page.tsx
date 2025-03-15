"use client";

import { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import NormalTranslator from "@/tabs/NormalTranslator";
import GameMode from "@/tabs/GameMode";

import "react-tabs/style/react-tabs.css";
import SpinningPig from "@/components/SpinningPig";

export default function Page() {
  const [pigSpinSpeed, setPigSpinSpeed] = useState(20000);

  const increasePigSpinSpeed = () => {
    setPigSpinSpeed(pigSpinSpeed * 0.8);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-center">
      <header className="text-4xl">Translate English to Pig Latin</header>
      <SpinningPig pigSpinSpeed={pigSpinSpeed} />
      {/* <button onClick={increasePigSpinSpeed}>Increase Pig Spin Speed</button> */}
      <div className="min-w-[60%]">
        <Tabs className="text-md">
          <TabList>
            <Tab>Translate</Tab>
            <Tab>Game</Tab>
          </TabList>
          <TabPanel>
            <NormalTranslator />
          </TabPanel>
          <TabPanel>
            <GameMode increasePigSpinSpeed={increasePigSpinSpeed} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
