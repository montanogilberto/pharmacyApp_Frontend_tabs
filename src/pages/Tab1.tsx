import React from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';

import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="center-container">
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Total Sales</IonCardSubtitle>
              <IonCardTitle>$500,000</IonCardTitle>
            </IonCardHeader>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Top Products</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>Product A</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Product B</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Product C</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Recent Transactions</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>Transaction 1</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Transaction 2</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Transaction 3</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
