// Products.tsx
import React, { useState, useEffect } from 'react';
import {
  IonCol, IonContent, IonHeader, IonLabel, IonPage, IonRow,
  IonText, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonItem, IonThumbnail, IonCardContent, IonList, IonSearchbar, IonButton, IonIcon
} from '@ionic/react';
import { pencil } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Products.css';

interface Product {
  name: string;
  barCode: string;
  code: string;
  dateOfExpire: string;
  productFormId: number;
  manufactureId: number;
  createdAt: string;
  productId: string;  // Ensure productId is included in the interface
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);  // Initialize as empty array
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://smartloansbackend.azurewebsites.net/all_products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);  // Set products to empty array on error
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (productId: string) => {
    history.push(`/Products/${productId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
          <IonSearchbar
            value={searchText}
            onIonChange={e => setSearchText(e.detail.value!)}
            placeholder="Search Products"
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {filteredProducts.map((product, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardTitle>{product.name}</IonCardTitle>
                <IonCardSubtitle>Expires on: {product.dateOfExpire}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem lines="none">
                  <IonThumbnail slot="start">
                    <img alt={`Thumbnail of ${product.name}`} src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                  </IonThumbnail>
                  <IonLabel>
                    Product Form ID: {product.productFormId}<br />
                    Manufacture ID: {product.manufactureId}<br />
                    Created At: {new Date(product.createdAt).toLocaleDateString()}
                  </IonLabel>
                  <IonButton fill="clear" slot="end" onClick={() => handleEdit(product.productId)}>
                    <IonIcon icon={pencil} />
                  </IonButton>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Products;
