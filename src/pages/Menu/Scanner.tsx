import React, { useState } from 'react';
import { IonContent, IonPage, IonButton, IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonBackButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { camera, send, trash } from 'ionicons/icons';
import { BlobServiceClient } from '@azure/storage-blob';

interface ImageData {
  image: string;
  url_file: string;
}

const Scanner: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
      });
      const imageUrl = image.base64String;
      if (imageUrl) {
        const currentDate = getCurrentDate();
        const newImage = { 
          image: `image${images.length + 1}_${currentDate}`, 
          url_file: imageUrl,
        };
        const newImages = [...images, newImage];
        console.log('New images:', newImages); // Log new images
        setImages(newImages);
  
        // Check if at least 3 images have been captured
        if (newImages.length === 3) {
          // Upload images to Azure Blob Storage
          await uploadImagesToBlobStorage(newImages);
        }
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

  const uploadImagesToBlobStorage = async (images: ImageData[]) => {
    try {
      const blobServiceClient = new BlobServiceClient('YOUR_CONNECTION_STRING');
      const containerName = 'images';
      const containerClient = blobServiceClient.getContainerClient(containerName);
      
      for (const image of images) {
        const blockBlobClient = containerClient.getBlockBlobClient(image.image);
        const response = await blockBlobClient.upload(image.url_file, image.url_file.length);
        console.log(`Image ${image.image} uploaded successfully:`, response.requestId);
      }
    } catch (error) {
      console.error('Error uploading images to Azure Blob Storage:', error);
    }
  };

  const handleFabButtonClick = async () => {
    if (images.length === 3) {
      await uploadImagesToBlobStorage(images);
    } else {
      takePicture();
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonContent className="ion-justify-content-center">
      <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              sizeSm="8"
              sizeMd="6"
              sizeLg="4"
              className="ion-text-center"
            >

              {images.map((img, index) => (
                <IonCard key={index}>
                  <IonImg src={`data:image/jpeg;base64,${img.url_file}`} onClick={() => handleImageClick(img.url_file)} />
                  <IonCardHeader>
                    <IonCardTitle>{`Captured Image ${index + 1}`}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonButton onClick={() => handleDeleteImage(index)} color="danger" expand="full">
                      <IonIcon icon={trash} slot="icon-only" />
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={handleFabButtonClick}>
            <IonIcon icon={images.length === 3 ? send : camera} />
          </IonFabButton>
        </IonFab>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonButtons>
              <IonTitle>Enlarged Image</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonImg src={`data:image/jpeg;base64,${selectedImage}`} />
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
