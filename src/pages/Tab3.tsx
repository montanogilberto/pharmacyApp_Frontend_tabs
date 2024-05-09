import { IonCol, IonContent, IonHeader, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent >
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">

            <IonText>text</IonText>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
