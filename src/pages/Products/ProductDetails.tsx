// ProductForm.tsx
import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonGrid, IonRow, IonCol, IonLabel, IonToast, IonButton, IonDatetime, IonItem } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import './Products.css'

const ProductDetails: React.FC = () => {
    const history = useHistory();
    const [product, setProduct] = useState({
        name: '',
        code: '',
        barCode: '',
        dateOfExpire: new Date().toISOString(),
        description: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (value: string | string[], field: keyof typeof product) => {
      if (Array.isArray(value)) {
          // If it's an array, handle accordingly, here we take the first value as example
          setProduct({ ...product, [field]: value[0] });
      } else {
          // It's a string, handle it directly
          setProduct({ ...product, [field]: value });
      }
  };
  

    const handleSave = async () => {
        console.log('Saving product...', product);
        // Here you would typically send a request to your backend to save the product
        // Simulating a save with a timeout
        setMessage('Saving product...');
        setTimeout(() => {
            setMessage('Product saved successfully!');
            history.push('/products'); // Redirect to products list after save
        }, 2000);
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">
                            <h1 className="ion-text-center">Product Details</h1>
                            <IonToast isOpen={!!message} message={message} duration={3000} onDidDismiss={() => setMessage('')} color="success" position="top" />
                            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                                <IonItem>
                                    <IonLabel position="floating">Name</IonLabel>
                                    <IonInput value={product.name} onIonChange={(e) => handleChange(e.detail.value!, 'name')} />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Code</IonLabel>
                                    <IonInput value={product.code} onIonChange={(e) => handleChange(e.detail.value!, 'code')} />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Bar Code</IonLabel>
                                    <IonInput value={product.barCode} onIonChange={(e) => handleChange(e.detail.value!, 'barCode')} />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Expiration Date</IonLabel>
                                    <IonDatetime value={product.dateOfExpire} onIonChange={(e) => handleChange(e.detail.value!, 'dateOfExpire')} />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Description</IonLabel>
                                    <IonInput value={product.description} onIonChange={(e) => handleChange(e.detail.value!, 'description')} />
                                </IonItem>
                                <IonButton type="submit" expand="full" color="primary">Save Product</IonButton>
                            </form>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ProductDetails;
