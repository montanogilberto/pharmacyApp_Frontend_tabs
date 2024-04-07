import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/camera';

const Scanner: React.FC = () => {
  const [images, setImages] = useState<{ image: string; file: string | undefined }[]>([]);

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
      });
      const imageUrl = image.base64String;
      if (imageUrl) {
        const newImages = [...images, { image: `image${images.length + 1}_${getCurrentDate()}`, file: imageUrl }];
        setImages(newImages);
      } else {
        console.error('Image URL is undefined');
      }
    } catch (error) {
      if (error === 'User cancelled photos app') {
        console.log('User cancelled taking a picture');
      } else {
        console.error('Error taking picture:', error);
      }
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const generateJSON = () => {
    const jsonData = { images: images.map((image, index) => ({ image: `image${index + 1}_${getCurrentDate()}`, file: image.file })) };
    console.log(jsonData);
    // Send jsonData to backend
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="container">
          {images.map((img, index) => (
            <img key={index} src={`data:image/jpeg;base64,${img.file}`} alt={`Captured Image ${index + 1}`} />
          ))}
          <IonButton onClick={takePicture}>Take Picture</IonButton>
          {images.length === 3 && <IonButton onClick={generateJSON}>Generate JSON</IonButton>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
