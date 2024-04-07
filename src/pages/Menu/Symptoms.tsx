import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonText,
  IonRow,
  IonCol,
  IonGrid,
  IonButton,
} from "@ionic/react";
import { mic, micOff, closeCircle, trashSharp } from "ionicons/icons";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

import './Symptoms.css';

const Symptoms: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [speechRecognizer, setSpeechRecognizer] = useState<sdk.SpeechRecognizer | null>(null);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);

  const subscriptionKey = "460390b601974d33a0d7969c32a041aa";
  const serviceRegion = "westus";


  // ... other functions

  useEffect(() => {
    async function checkMicrophonePermission() {
      try {
        const audioDevices = await navigator.mediaDevices.enumerateDevices();
        const hasMic = audioDevices.some((device) => device.kind === "audioinput");
        setHasMicrophonePermission(hasMic);
      } catch (error) {
        console.error("Error checking microphone permission:", error);
        // Handle error scenario here
      }
    }

    checkMicrophonePermission();
  }, []);

  const toggleRecording = async () => {
    setIsRecording((prev) => !prev);

    if (!hasMicrophonePermission) {
      console.error("Microphone permission is required to start recording.");
      // Prompt the user to grant microphone permission (implementation TBD)
      return;
    }

    if (!isRecording) {
      console.log("Starting transcription...");
      const config = sdk.SpeechConfig.fromSubscription(
        subscriptionKey,
        serviceRegion
      );
      config.speechRecognitionLanguage = "es-ES";
      config.setProperty("allowClearFrequency", "false");
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

  const downloadTranscriptionsAsJson = () => {
    const jsonContent = JSON.stringify({
      recomendacionMedica: [
        {
          descripcion: {
            idioma: "es-EN",
            texto: "Recomendación médica basada en transcripciones de síntomas."
          },
          persona: {
            tipoPersona: "Adulto"
          },
          sintomas: transcriptions.reduce((acc: any, transcription, index) => {
            acc[`sintoma${index + 1}`] = transcription;
            return acc;
          }, {}),
          formatoResultado: {
            formato: {
              recomendaciones: [
                {
                  sintoma: "",
                  tratamiento: "",
                  "nombre del medicamento": "",
                  mg: " mg"
                }
              ]
            }
          }
        }
      ]
    }, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    console.log("Transcriptions JSON:", jsonContent);
    console.log("Download JSON:", url);
  };
  

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
            <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">
              <IonText>
                {transcriptions.map((transcription, index) => (
                  <div key={index} className={`transcription-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    {transcription}
                    {index < transcriptions.length - 1 && <br />}
                    <IonIcon
                      icon={trashSharp}
                      onClick={() => deleteTranscription(index)}
                    />
                  </div>
                ))}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton onClick={downloadTranscriptionsAsJson}>Download Transcriptions JSON</IonButton>
      </IonContent>
    </IonPage>
  );  
};

export default Symptoms;
