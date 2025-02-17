"use client";

import { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import NormalTranslator from "@/tabs/NormalTranslator";
import GameMode from "@/tabs/GameMode";

import "react-tabs/style/react-tabs.css";

// const PigImageSpin = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

export default function Page() {
  const [pigSpinSpeed, setPigSpinSpeed] = useState(20);

  const increasePigSpinSpeed = () => {
    setPigSpinSpeed(pigSpinSpeed * 0.8);
  };

  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center text-pink-300 bg-[#282c34]">
      <h1 className="text-4xl">Translate English to Pig Latin</h1>
      <img
        src="/LargePig.png"
        alt="This piggy went to market"
        // pigSpinSpeed={pigSpinSpeed}
        style={{
          maxWidth: "300px",
          height: "auto",
          pointerEvents: "none",
          padding: "5%",
          // animation: `${PigImageSpin} infinite ${(props) => props.pigSpinSpeed || 0}s
          //   linear`,
        }}
      />
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
