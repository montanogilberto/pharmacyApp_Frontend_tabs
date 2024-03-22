import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet} from '@ionic/react';
import { Route  } from 'react-router-dom';
import { home, barcode, storefront, medkit } from 'ionicons/icons';

import Home from '../pages/Menu/Home';
import Scanner from '../pages/Menu/Scanner';
import Tab3 from '../pages/Tab3';
import Symptoms from '../pages/Menu/Symptoms';

const Tabs: React.FC = () => {
  return (
    
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Menu/Home" component={Home} />
          <Route exact path="/Menu/Scanner" component={Scanner} />
          <Route path="/tab3" component={Tab3} />
          <Route path="/Menu/Symptoms" component={Symptoms} />
        </IonRouterOutlet>
        <IonTabBar>
          <IonTabButton tab="Home" href="/Menu/Home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Scanner" href="/Menu/Scanner">
            <IonIcon icon={barcode} />
            <IonLabel>Scanner</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={storefront} />
            <IonLabel>Products</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Symptoms" href="/Menu/Symptoms">
            <IonIcon aria-hidden="true" icon={medkit} />
            <IonLabel>Symptoms</IonLabel>
          </IonTabButton>
        </IonTabBar>

      </IonTabs>

  );
};

export default Tabs;
