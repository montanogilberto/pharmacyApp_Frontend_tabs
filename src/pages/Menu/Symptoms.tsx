import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonText,
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/react";
import { mic, micOff, closeCircle } from "ionicons/icons";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

import './Symptoms.css'


const Symptoms: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [speechRecognizer, setSpeechRecognizer] = useState<sdk.SpeechRecognizer | null>(null);

  const subscriptionKey = "460390b601974d33a0d7969c32a041aa";
  const serviceRegion = "westus";



  const toggleRecording = async () => {

    setIsRecording((prev) => !prev);

    if (!isRecording) {
      console.log("Starting transcription...");
      const config = sdk.SpeechConfig.fromSubscription(
        subscriptionKey,
        serviceRegion
      );
      const recognizer = new sdk.SpeechRecognizer(config);
      recognizer.recognized = (s, e) => {
        console.log("Recognition result:", e.result.text);
        handleTranscription(e.result.text);
      };
      recognizer.startContinuousRecognitionAsync();
      setSpeechRecognizer(recognizer);
    } else {
      console.log("Stopping transcription...");
      if (speechRecognizer) {
        speechRecognizer.stopContinuousRecognitionAsync();
        speechRecognizer.close();
        setSpeechRecognizer(null);
      }
    }
  };

  const handleTranscription = (transcription: string) => {
    console.log("Received transcription:", transcription);
    const sentences = transcription.split(/[\.\?\!]+/); // Split text into sentences
    setTranscriptions((prev) => [
      ...prev,
      ...sentences.filter((sentence) => sentence.trim() !== ""),
    ]); // Add sentences to transcriptions list
  };

  const deleteTranscription = (index: number) => {
    console.log("Deleting transcription at index:", index);
    setTranscriptions((prev) => prev.filter((_, i) => i !== index));
  };

  console.log("Transcriptions:", transcriptions);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              sizeSm="8"
              sizeMd="6"
              sizeLg="4"
              className="ion-text-center"
            >
              <h1>Symptoms</h1>
              <IonIcon
                size="large"
                onClick={toggleRecording}
                className={isRecording ? "recording-button" : "symptoms-button"}
                icon={isRecording ? micOff : mic}
              />
              <br />
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol>
              {transcriptions.map((transcription, index) => (
                <div key={index} className="transcription-item">
                  <IonText>{transcription}</IonText>
                  <IonIcon
                    icon={closeCircle}
                    color="red"
                    onClick={() => setTranscriptions(transcriptions.filter((_, i) => i !== index))}
                  />
                </div>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Symptoms;
