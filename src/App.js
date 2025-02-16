"use client";

import {useState} from 'react';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import styled, {keyframes} from 'styled-components';

import NormalTranslator from './NormalTranslator';
import GameMode from './GameMode';

import 'react-tabs/style/react-tabs.css';

const AppContainer = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: pink;
`;

const AppTitle = styled.header`
  font-size: 2em;
`;

const PigImageSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const PigImage = styled.img`
  max-width: 300px;
  height: auto;
  pointer-events: none;
  padding: 5%;
  animation: ${PigImageSpin} infinite ${props => props.pigSpinSpeed || 0}s linear;
`;

const TabsContainer = styled.div`
  min-width: 60%;
`;

const TabsLabelContainer = styled.div`
  font-size: 1.2em;
`;

const VerticalSpacer = styled.div`
  flex-grow: 1;
`;

const Link = styled.a`
  color: white;
`;

const Attribution = styled.div`
  font-size: 1vmin;
`;

const App = () => {
  const [pigSpinSpeed, setPigSpinSpeed] = useState(20);

  const increasePigSpinSpeed = () => {
    setPigSpinSpeed(pigSpinSpeed * .8);
  };

  return (
    <AppContainer>
      <AppTitle>English-to-Pig Latin Translator</AppTitle>
      <PigImage
        src="/LargePig.png"
        alt="This piggy went to market"
        pigSpinSpeed={pigSpinSpeed}
      />
      <TabsContainer>
        <Tabs>
          <TabsLabelContainer>
            <TabList>
              <Tab>Translate</Tab>
              <Tab>Game</Tab>
            </TabList>
          </TabsLabelContainer>
          <TabPanel>
            <NormalTranslator/>
          </TabPanel>
          <TabPanel>
            <GameMode increasePigSpinSpeed={increasePigSpinSpeed}/>
          </TabPanel>
        </Tabs>
      </TabsContainer>
      <VerticalSpacer/>
      <Attribution>Icons made by <Link href="https://www.flaticon.com/authors/hery-mery" title="Hery Mery">Hery Mery</Link> and <Link href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</Link> from <Link href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link></Attribution>
    </AppContainer>
  );
}

export default App;
