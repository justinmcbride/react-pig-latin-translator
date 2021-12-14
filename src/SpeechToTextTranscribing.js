import {useEffect, useState} from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styled from 'styled-components';
import translator from './translator';

const EnglishOutput = styled.div`
`;

const PigLatinOutput = styled.div`
`;

const RecordingButton = styled.button`
  background-image: linear-gradient(135deg, #f34079 40%, #fc894d);
  border: 0;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-family: "Codec cold",sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: .4px;
  text-transform: uppercase;

  &&:active {
    outline: 0;
  }

  &&:hover {
    outline: 0;
  }

  &&:span {
    transition: all 200ms;
  }

  &&:hover span {
    transform: scale(.9);
    opacity: .75;
  }
`;

const RecordingButtonText = styled.span`
  &&:hover {
    transform: scale(.9);
    opacity: .75;
  }
`;

const SpeechToTextTranscribing = () => {
  const [transcribedEnglish, setTranscribedEnglish] = useState(``);
  const [transcribedPigLatin, setTranscribedPigLatin] = useState(``);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setTranscribedEnglish(transcript);

    let pigLatinOutput = ``;
    for(const englishWord of transcript.split(' ')) {
      if (englishWord.length === 0) continue; 
      pigLatinOutput += ` ` + translator(englishWord);
    }
    setTranscribedPigLatin(pigLatinOutput);

    console.log(`Received transcription: english=[${transcript}] pigLatin=[${pigLatinOutput}]`);
  }, [transcript]);

  const handleRecordingButtonClicked = () => {
    if (!listening) {
      console.log(`Attempting to start recording`);
      SpeechRecognition.startListening({ continuous: true });
    }
    else {
      console.log(`Attempting to stop recording`);
      SpeechRecognition.stopListening();
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <div>
      Browser does not support speech recognition.
    </div>;
  }

  return <div>
    <RecordingButton onClick={handleRecordingButtonClicked}>
      <RecordingButtonText>
        { listening ? `Stop Transcribing` : `Transcribe Speech` }
      </RecordingButtonText>
    </RecordingButton>
    {transcribedEnglish.length ? <EnglishOutput>English: {transcribedEnglish}</EnglishOutput> : null}
    {transcribedPigLatin.length ? <PigLatinOutput>Pig Latin: {transcribedPigLatin}</PigLatinOutput> : null}
  </div>;
};

export default SpeechToTextTranscribing;
