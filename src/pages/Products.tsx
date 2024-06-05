import React, { useState } from 'react';
import {
  IonCol, IonContent, IonHeader, IonLabel, IonPage, IonRow,
  IonText, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonItem, IonThumbnail, IonCardContent, IonList, IonSearchbar, IonButton, IonIcon
} from '@ionic/react';
import './Products.css';
import { createOutline, pencil } from 'ionicons/icons';

interface Product {
  productId: number;
  name: string;
  code: string;
  barCode: string;
  dateOfExpire: string;
  productFormId: number;
  manufactureId: number;
  description: string;
  imageUrl: string;
}

const products: Product[] = [
  {
    productId: 1,
    name: "Product 1",
    code: "001",
    barCode: "ABC123",
    dateOfExpire: "2024-01-01",
    productFormId: 1,
    manufactureId: 1,
    description: "This is a sample description of Product 1.",
    imageUrl: "https://ionicframework.com/docs/img/demos/thumbnail.svg"
  },
  // Add more products as needed
];

const Products: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <IonPage>
      <IonContent>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">
            <IonToolbar>
              <IonSearchbar 
                value={searchText} 
                onIonChange={e => setSearchText(e.detail.value!)} 
                placeholder="Search Products"
              />
            </IonToolbar>
            <IonList>
              {products.filter(product => 
                product.name.toLowerCase().includes(searchText.toLowerCase())
              ).map(product => (
                <IonCard key={product.productId}>
                  <IonCardHeader>
                    <IonCardTitle>{product.name}</IonCardTitle>
                    <IonCardSubtitle>Code: {product.code}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem lines="none">
                      <IonThumbnail slot="start">
                        <img alt={`Thumbnail of ${product.name}`} src={product.imageUrl} />
                      </IonThumbnail>
                      <IonLabel>
                        Barcode: {product.barCode}<br />
                        Expires on: {product.dateOfExpire}<br />
                        Description: {product.description}
                      </IonLabel>
                    </IonItem>
                    <IonButton  onClick={() => console.log('Edit', product.productId)}>
                        <IonIcon icon={pencil} />
                      </IonButton>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Products;
