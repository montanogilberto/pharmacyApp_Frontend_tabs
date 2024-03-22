import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { Camera, CameraResultType } from '@capacitor/camera';

import './Scanner.css';

const { BarcodeScanner } = Plugins;

const Scanner: React.FC = () => {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(''); // Fix applied here

  const handleScan = async () => {
    try {
      const result = await BarcodeScanner.startScan();
      console.log('Scanned barcode:', result.text);
      setBarcode(result.text);
      // Handle the scanned barcode here
    } catch (error) {
      console.error('Error scanning barcode:', error);
    }
  };

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      const imageUrl = image.webPath;
      if (imageUrl) {
        setImageSrc(imageUrl);
      } else {
        console.error('Image URL is undefined');
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Scanner</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          {/* Optional: You can add a message here indicating that the scanner is active */}
          <p>Scanner is active...</p>
          {/* Add a button to trigger barcode scanning */}
          <IonButton onClick={handleScan}>Scan Barcode</IonButton>
          {/* Add an image element to display the captured image */}
          {imageSrc && <img src={imageSrc} alt="Captured Image" />}
          {/* Add a button to trigger taking a picture */}
          <IonButton onClick={takePicture}>Take Picture</IonButton>
          {/* Display the scanned barcode */}
          {barcode && <p>Scanned barcode: {barcode}</p>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
