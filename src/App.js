import {useState} from 'react';

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import styled, {keyframes} from 'styled-components';

import NormalTranslator from './NormalTranslator';
import GameMode from './GameMode';
import SpeechToTextTranscribing from './SpeechToTextTranscribing';

import 'react-tabs/style/react-tabs.css';

const AppContainer = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(20px + 2vmin);
  color: pink;
`;

const AppTitle = styled.header`
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
  max-width: 30%;
  height: auto;
  pointer-events: none;
  padding: 5%;
  animation: ${PigImageSpin} infinite ${props => props.pigSpinSpeed || 0}s linear;
`;

const MersiveLogo = styled.img`
  width: 10%;
  position: absolute;
  bottom: 0;
  right: 0;
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
      <Tabs>
        <TabList>
          <Tab>Translate</Tab>
          <Tab>Speech-To-Text</Tab>
          <Tab>Game</Tab>
        </TabList>
        <TabPanel>
          <NormalTranslator/>
        </TabPanel>
        <TabPanel>
          <SpeechToTextTranscribing/>
        </TabPanel>
        <TabPanel>
          <GameMode increasePigSpinSpeed={increasePigSpinSpeed}/>
        </TabPanel>
      </Tabs>
      <VerticalSpacer/>
      <MersiveLogo
        alt="Innovation that excites"
        src="/mersive2.png"
      />
      <Attribution>Icons made by <Link href="https://www.flaticon.com/authors/hery-mery" title="Hery Mery">Hery Mery</Link> and <Link href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</Link> from <Link href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link></Attribution>
    </AppContainer>
  );
}

export default App;
