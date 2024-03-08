import React, { useState } from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonButtons,
  IonButton,
  IonPopover,
  IonList,
  IonItem,
  IonLabel as IonItemLabel,
  IonItemDivider,
  setupIonicReact
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Link, useHistory } from 'react-router-dom';
import { ellipse, square, triangle, helpCircleOutline, logOutOutline, mailOutline, closeOutline } from 'ionicons/icons';


import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
//import Login from './pages/Login';
//import ForgotPassword from './pages/ForgotPassword';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory(); // Add this line
  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };
  const handleLogout = () => {
    setAuthenticated(false);
    history.push('/login'); // Add this line
  };

  const [showAlertPopover, setShowAlertPopover] = useState<{ showPopover: boolean; event?: Event }>({
    showPopover: false
  });

  const [showMailPopover, setShowMailPopover] = useState<{ showPopover: boolean; event?: Event }>({
    showPopover: false
  });

  const presentAlertPopover = (e: React.MouseEvent) => {
    setShowAlertPopover({ showPopover: true, event: e.nativeEvent });
  };

  const dismissAlertPopover = () => setShowAlertPopover({ showPopover: false });

  const presentMailPopover = (e: React.MouseEvent) => {
    setShowMailPopover({ showPopover: true, event: e.nativeEvent });
  };

  const dismissMailPopover = () => setShowMailPopover({ showPopover: false });

  return (
    <IonApp>
      <IonReactRouter>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={presentAlertPopover}>
                <IonIcon slot="icon-only" icon={helpCircleOutline} />
              </IonButton>
              <IonButton onClick={presentMailPopover}>
                <IonIcon slot="icon-only" icon={mailOutline} />
              </IonButton>
              <IonButton routerDirection="forward" onClick={handleLogout} fill="clear">
                <IonIcon slot="icon-only" icon={logOutOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <Tab1 />
              </Route>
              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon aria-hidden="true" icon={triangle} />
                <IonLabel>Tab 1</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={ellipse} />
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Tab 3</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>

          {/* Alert Popover */}
          <IonPopover
            isOpen={showAlertPopover.showPopover}
            event={showAlertPopover.event}
            onDidDismiss={dismissAlertPopover}
          >
            <IonList>
            <IonItemDivider>
                Alert Details
                <IonButton fill="clear" slot="end" onClick={dismissAlertPopover}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonItemDivider>
              <IonItem>
                <IonItemLabel>Name: Your Name</IonItemLabel>
              </IonItem>
            </IonList>
          </IonPopover>

          {/* Mail Popover */}
          <IonPopover
            isOpen={showMailPopover.showPopover}
            event={showMailPopover.event}
            onDidDismiss={dismissMailPopover}
          >
            <IonList>
            <IonItemDivider>
                Mail Details
                <IonButton fill="clear" slot="end" onClick={dismissMailPopover}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonItemDivider>
              <IonItem>
                <IonItemLabel>Email: your@email.com</IonItemLabel>
              </IonItem>
            </IonList>
          </IonPopover>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
