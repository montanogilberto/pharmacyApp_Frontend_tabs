import React, { useState } from 'react';
import { IonApp, IonContent, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, setupIonicReact, IonPopover, IonList
  , IonItemDivider, IonButton,  IonItem,  IonAlert, IonCol, IonRow } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { helpCircleOutline, logOutOutline, mailOutline, closeOutline, home, storefront, barcode, medkit } from 'ionicons/icons';

import Home from './pages/Menu/Home';
import Scanner from './pages/Menu/Scanner';
import Tab3 from './pages/Tab3';
import Symptoms from './pages/Menu/Symptoms';
import Login from './pages/Authentication/Login';
import Header from './components/Header';
import LogoutAlert from './components/LogoutAlert';


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
import './App.css';

setupIonicReact();

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const history = useHistory();

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setShowLogoutAlert(true); // Show the logout alert
  };

  const handleLogoutConfirm = () => {
    setAuthenticated(false);
    history.push('/Login');
    setShowLogoutAlert(false); // Hide the logout alert after logout
  };

  const [popoverState, setPopoverState] = useState<{ showAlertPopover: boolean; showMailPopover: boolean; event?: Event }>({
    showAlertPopover: false,
    showMailPopover: false
  });

  const presentAlertPopover = (e: React.MouseEvent) => {
    setPopoverState({ ...popoverState, showAlertPopover: true, event: e.nativeEvent });
  };

  const dismissAlertPopover = () => setPopoverState({ ...popoverState, showAlertPopover: false });

  const presentMailPopover = (e: React.MouseEvent) => {
    setPopoverState({ ...popoverState, showMailPopover: true, event: e.nativeEvent });
  };

  const dismissMailPopover = () => setPopoverState({ ...popoverState, showMailPopover: false });

  return (
    <IonApp>
      
      <IonReactRouter>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">
            <Header
              presentAlertPopover={presentAlertPopover}
              presentMailPopover={presentMailPopover}
              handleLogout={handleLogout}
            />
          </IonCol>
        </IonRow>
        <IonContent className="ion-justify-content-center" >
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/Menu/Home" component={Home} />
              <Route exact path="/Menu/Scanner" component={Scanner} />
              <Route path="/tab3" component={Tab3} />
              <Route path="/Menu/Symptoms" component={Symptoms} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" render={() => <Redirect to="/Home" />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="Home" href="/Menu/Home">
                <IonIcon aria-hidden="true" icon={home} />
                Home
              </IonTabButton>
              <IonTabButton tab="Scanner" href="/Menu/Scanner">
                <IonIcon icon={barcode} />
                Scanner
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={storefront} />
                Products
              </IonTabButton>
              <IonTabButton tab="Symptoms" href="/Menu/Symptoms">
                <IonIcon aria-hidden="true" icon={medkit} />
                Symptoms
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
          <IonPopover
            isOpen={popoverState.showAlertPopover}
            event={popoverState.event}
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
                <IonLabel>Name: Your Name</IonLabel>
              </IonItem>
            </IonList>
          </IonPopover>
          <IonPopover
            isOpen={popoverState.showMailPopover}
            event={popoverState.event}
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
                <IonLabel>Email: your@email.com</IonLabel>
              </IonItem>
            </IonList>
          </IonPopover>
          <LogoutAlert
            isOpen={showLogoutAlert}
            onDidDismiss={() => setShowLogoutAlert(false)}
            handleLogoutConfirm={handleLogoutConfirm}
          />
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
