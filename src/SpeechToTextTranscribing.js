import {useState} from 'react';

import {useReactMediaRecorder} from 'react-media-recorder';
import FormData from 'form-data';
import axios from 'axios';
import styled from 'styled-components';

import OinkServer from './ServerInfo';

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

  const [isAudioRecording, setIsAudioRecording] = useState(false);

  const handleRecordingStopped = (blobUrl, blob) => {
    setIsAudioRecording(false);
    console.log(`Recording stopped.`);

    const formData = new FormData();
    formData.append('file', blob, 'audio_recording');
    axios({
      method: 'post',
      url: `${OinkServer}/transcribeAndTranslate`,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(res => {
      const transcriptionResults = res.data;
      console.log(`Received transcriptions: english=[${transcriptionResults.englishWords}] pigLatin=[${transcriptionResults.pigLatinWords}]`)
      setTranscribedEnglish(transcriptionResults.englishWords.join(' '));
      setTranscribedPigLatin(transcriptionResults.pigLatinWords.join(' '));
    })
    .catch(err => {
      console.error(`handleRecordingStopped: error posting data: ${err}`);
    });
  }

  const {
    startRecording,
    stopRecording,
  } = useReactMediaRecorder({onStop: handleRecordingStopped});

  const handleRecordingButtonClicked = () => {
    if (!isAudioRecording) {
      console.log(`Attempting to start recording`);
      startRecording();
      setIsAudioRecording(true);
    }
    else {
      console.log(`Attempting to stop recording`);
      stopRecording();
    }
  }

  return (
    <div>
      <RecordingButton onClick={handleRecordingButtonClicked}>
        <RecordingButtonText>
          { !isAudioRecording ? `Transcribe Speech` : `Stop Transcribing` }
        </RecordingButtonText>
      </RecordingButton>
      {transcribedEnglish.length ? <EnglishOutput>English: {transcribedEnglish}</EnglishOutput> : null}
      {transcribedPigLatin.length ? <PigLatinOutput>Pig Latin: {transcribedPigLatin}</PigLatinOutput> : null}
    </div>
  );
};

export default SpeechToTextTranscribing;
