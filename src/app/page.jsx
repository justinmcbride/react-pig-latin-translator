"use client";

import { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import NormalTranslator from "@/tabs/NormalTranslator";
import GameMode from "@/tabs/GameMode";

import "react-tabs/style/react-tabs.css";
import SpinningPig from "@/components/SpinningPig";

export default function Page() {
  const [pigSpinSpeed, setPigSpinSpeed] = useState(20);

  const increasePigSpinSpeed = () => {
    setPigSpinSpeed(pigSpinSpeed * 0.8);
  };

  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center text-[pink] bg-[#282c34]">
      <header className="text-4xl">Translate English to Pig Latin</header>
      <div className="p-[5%]">
        <SpinningPig />
      </div>
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
      <div className="flex grow" />
      <div className="text-xs">
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/hery-mery"
          title="Hery Mery"
          className="text-white"
        >
          Hery Mery
        </a>{" "}
        and{" "}
        <a
          href="https://www.flaticon.com/authors/freepik"
          title="Freepik"
          className="text-white"
        >
          Freepik
        </a>{" "}
        from{" "}
        <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          className="text-white"
        >
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}
