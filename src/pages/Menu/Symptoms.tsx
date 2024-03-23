import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonLabel,
  IonText,
  IonRow,
  IonCol,
} from '@ionic/react';
import { mic, micOff } from 'ionicons/icons';
import './Home.css';

const Symptoms: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<any>(null);

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    if (!recognition) {
      const newRecognition = new (window as any).webkitSpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.lang = 'en-US';

      newRecognition.onstart = () => {
        console.log('Recording started');
        setIsRecording(true);
        setTranscriptions([]);
      };

      newRecognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          console.log('Transcript:', transcript);
          setTranscriptions(prevTranscriptions => [...prevTranscriptions, transcript]);
        }
      };

      newRecognition.onerror = (event: any) => {
        console.error('Error:', event.error);
        stopRecording();
      };

      newRecognition.onend = () => {
        console.log('Recording ended');
        setIsRecording(false);
      };

      setRecognition(newRecognition);
    }

    recognition.start();
  };

  const stopRecording = () => {
    
    console.log('stop')
    recognition.stop();
    
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4" className="ion-text-center">
            <h1>Symptoms</h1>
            <IonButton size="large" onClick={toggleRecording}>
              <IonIcon icon={isRecording ? micOff : mic} />
            </IonButton>
            <br />
            {isRecording && <IonText>Recording...</IonText>}
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol>
            {transcriptions.map((transcript, index) => (
              <IonText key={index}>{`Transcription ${index + 1}: ${transcript}`}</IonText>
            ))}
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Symptoms;
