// File Path: ./Products/ProductDetails.tsx
import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonInput, IonGrid, IonRow, IonCol, IonLabel, IonToast, IonButton, IonDatetime, IonItem, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const history = useHistory();
    const [product, setProduct] = useState({
        name: '',
        code: '',
        barCode: '',
        dateOfExpire: new Date().toISOString(),
        description: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch('https://smartloansbackend.azurewebsites.net/one_products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        products: [
                            {
                                productId: productId
                            }
                        ]
                    }),
                });
                const data = await response.json();
                if (data.products && data.products.length > 0) {
                    setProduct(data.products[0]);
                } else {
                    setMessage('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                setMessage('Error fetching product details');
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleChange = (value: string | string[], field: keyof typeof product) => {
        if (Array.isArray(value)) {
            setProduct({ ...product, [field]: value[0] });
        } else {
            setProduct({ ...product, [field]: value });
        }
    };

    const handleSave = async () => {
        console.log('Saving product...', product);
        // Here you would typically send a request to your backend to save the product
        setMessage('Saving product...');
        setTimeout(() => {
            setMessage('Product saved successfully!');
            history.push('/products'); // Redirect to products list after save
        }, 2000);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/products" />
                    </IonButtons>
                    <IonTitle>Product Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">
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
