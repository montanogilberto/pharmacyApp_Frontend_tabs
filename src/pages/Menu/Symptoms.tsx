import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonLabel,
  IonText,
} from '@ionic/react';
import { mic, micOff } from 'ionicons/icons';
import './Home.css';

const Symptoms: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url); // Set the URL to play the recorded audio
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error capturing audio:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButton onClick={toggleRecording}>
          <IonIcon icon={isRecording ? micOff : mic} />
        </IonButton>
        {audioUrl && (
          <div>
            <audio controls src={audioUrl} />
            <IonText>Audio URL: {audioUrl}</IonText>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Symptoms;
