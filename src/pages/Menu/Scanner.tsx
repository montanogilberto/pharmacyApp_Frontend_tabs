import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonFab, IonFabButton, IonIcon, IonCol } from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { camera, send, trash } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import './Scanner.css';
import { BlobServiceClient } from '@azure/storage-blob';

interface ImageData {
  image: string;
  url_file: string;
}

const Scanner: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

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

  return (
    <IonPage>
      <IonContent className="ion-justify-content-center">
        <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">
          <Swiper
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                <div className="swiper-slide-content">
                  <img src={`data:image/jpeg;base64,${img.url_file}`} alt={`Captured Image ${index + 1}`} />
                  <IonButton onClick={() => handleDeleteImage(index)} color="danger" expand="full">
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonButton>
                </div>
              </SwiperSlide>
              ))}
            </Swiper>
          </IonCol>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={handleFabButtonClick}>
              <IonIcon icon={images.length === 3 ? send : camera} />
            </IonFabButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
