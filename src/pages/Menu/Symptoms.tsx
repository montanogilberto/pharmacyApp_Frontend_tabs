import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonText,
  IonRow,
  IonCol,
  IonGrid,
  IonButton,
  IonLoading,
  IonModal,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAlert
} from "@ionic/react";
import { add, mic, micOff, trashSharp } from "ionicons/icons";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

import './Symptoms.css';

interface Recommendation {
  sintoma: string;
  tratamiento: string;
  nombre_medicamento: string;
  dosis: string;
  recomendaciones: string
}

const Symptoms: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [speechRecognizer, setSpeechRecognizer] = useState<sdk.SpeechRecognizer | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [groupedRecommendations, setGroupedRecommendations] = useState<{ [key: string]: Recommendation }>({});
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const subscriptionKey = "460390b601974d33a0d7969c32a041aa";
  const serviceRegion = "westus";

  const toggleRecording = async () => {
    setIsRecording(prev => !prev);

    if (!isRecording) {
      console.log("Starting transcription...");
      const config = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
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
    const sentences = transcription.split(/[\.\?\!]+/);
    setTranscriptions(prev => [
      ...prev,
      ...sentences.filter(sentence => sentence.trim() !== "")
    ]);
  };

  const deleteTranscription = (index: number) => {
    console.log("Deleting transcription at index:", index);
    setTranscriptions(prev => prev.filter((_, i) => i !== index));
  };

  const downloadTranscriptionsAsJson = async () => {
    setShowLoading(true);

    const jsonPayload = {
      descripcion: {
        idioma: "es-EN",
        texto: "Me podrías ayudar a recomendar medicamentos de al menos una logitud de 100 caracteres en esta parte ( tratamiento: '') que me ayuden con los síntomas listados en el archivo JSON, teniendo en cuenta también para quién está dirigido, es decir, en personas. Favor de tomar la información solo de libros oficiales de medicina, tratando de ser muy específico en gramos. Entiendo que lo mejor es consultar a un médico y/o farmacéutico. Podrías proporcionarme la recomendación médica en el formato JSON especificado en formato? Necesito que las recomendaciones estén estructuradas de acuerdo con el siguiente formato JSON. gracias"
      },
      persona: {
        tipoPersona: "Adulto"
      },
      sintomas: Object.fromEntries(
        transcriptions.map((transcription, index) => [`sintoma${index + 1}`, transcription])
      ),
      formatoResultado: {
        formato: {
          recomendaciones: [
            {
              sintoma: "",
              tratamiento: "",
              nombre_medicamento: "",
              dosis: "",
              recomendaciones: ""
            }
          ]
        }
      }
    };

    const jsonContent = JSON.stringify(jsonPayload, null, 2);
    console.log("JSON Payload:", jsonContent);

    try {
      const response = await fetch('https://smartloansbackend.azurewebsites.net/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonContent,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      console.log(data);

      const recommendations = data.formatoResultado.formato.recomendaciones;
      const grouped: { [key: string]: Recommendation } = {};
      recommendations.forEach((recommendation: Recommendation) => {
        const medicationName = recommendation.nombre_medicamento;
        if (!grouped[medicationName]) {
          grouped[medicationName] = recommendation;
        } else {
          grouped[medicationName].tratamiento += `, ${recommendation.tratamiento}`;
        }
      });
      setGroupedRecommendations(grouped);
      setShowModal(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setShowLoading(false);
    }
  };

  const addToCart = (medicationName: string) => {
    setCart(prevCart => ({
      ...prevCart,
      [medicationName]: (prevCart[medicationName] || 0) + 1
    }));
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
        <IonButton onClick={downloadTranscriptionsAsJson} disabled={transcriptions.length === 0}>
          Download Transcriptions JSON
        </IonButton>

        <IonLoading
          isOpen={showLoading}
          message={'Sending Request...'}
          spinner="circles"
          translucent={true}
          cssClass="custom-loading"
        />

        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Recommendations</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowConfirmation(true)}>
                  Close
                </IonButton>
              </IonButtons>
              <IonAlert
                isOpen={showConfirmation}
                onDidDismiss={() => setShowConfirmation(false)}
                header={'Confirm'}
                message={'Are you sure you want to close the recommendation modal?'}
                buttons={[
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Yes',
                    handler: () => {
                      setShowModal(false);
                    }
                  }
                ]}
              />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {Object.values(groupedRecommendations).map((recommendation, index) => (
              <div key={index} className="recommendation-item">
                <p className="recommendation-header">Recommendation {index + 1}:</p>
                <p><strong>Sintoma:</strong> {recommendation.sintoma}</p>
                <p><strong>Tratamientos:</strong> {recommendation.tratamiento}</p>
                <p><strong>Medicamento:</strong> {recommendation.nombre_medicamento}</p>
                <p><strong>Dosis:</strong> {recommendation.dosis}</p>
                <p><strong>Recomendaciones:</strong> {recommendation.recomendaciones}</p>

              </div>
            ))}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};