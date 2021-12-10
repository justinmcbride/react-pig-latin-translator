import './GenericButton.css';

import { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

import FormData from 'form-data';
import axios from 'axios';

import { OINK_SERVER_URL, OINK_SERVER_PORT } from './ServerInfo';

const RecordingButton = ({onTranscribeResult}) => {
  const [isAudioRecording, setIsAudioRecording] = useState(false);

  const handleRecordingStopped = (blobUrl, blob) => {
    setIsAudioRecording(false);
    console.log(`Recording stopped.`);
    console.dir(blob);

    const formData = new FormData();
    formData.append('file', blob, 'audio_recording');
    axios({
      method: 'post',
      url: `${OINK_SERVER_URL}:${OINK_SERVER_PORT}/transcribeAndTranslate`,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(res => {
      console.log(`Received transcription result: ${JSON.stringify(res.data)}`);
      onTranscribeResult(res.data);
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
    <button
      className="genericButton"
      inline="true"
      onClick={handleRecordingButtonClicked}
    >
        <span className="text">
          { !isAudioRecording ? `Transcribe Speech` : `Stop Transcribing` }
        </span>
    </button>
  );
};

export default RecordingButton;
