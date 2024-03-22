import React from 'react';
import { IonPopover, IonList, IonItem, IonLabel, IonItemDivider, IonButton, IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

const Popover: React.FC<{ isOpen: boolean; onDidDismiss: () => void; presentPopover: (e: React.MouseEvent) => void }> = ({ isOpen, onDidDismiss, presentPopover }) => {
  return (
    <IonPopover isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonList>
        <IonItemDivider>
          Alert Details
          <IonButton fill="clear" slot="end" onClick={onDidDismiss}>
            <IonIcon icon={closeOutline} />
          </IonButton>
        </IonItemDivider>
        <IonItem>
          <IonLabel>Name: Your Name</IonLabel>
        </IonItem>
      </IonList>
    </IonPopover>
  );
};

export default Popover;