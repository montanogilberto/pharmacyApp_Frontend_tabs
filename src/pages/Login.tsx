// Login.tsx
import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonLabel, IonPage, IonCol, IonRow, IonGrid } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../master.css';
import './Login.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://smartloansbackend.azurewebsites.net/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logins: [
            {
              username,
              password,
            },
          ],
        }),
      });

      if (!response.ok) {
        // Handle error scenarios based on your backend response
        console.error('Login failed');
        return;
      }

      // Call the callback to handle successful login
      onLoginSuccess();
      history.push('/tab1');
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm="8" size-md="6" size-lg="4">
              <h1 className="ion-text-center">Login</h1>
              <form onSubmit={handleLogin}>
                <IonLabel position="floating">Username</IonLabel>
                <IonInput
                  type="text"
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)}
                  style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                ></IonInput>

                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                ></IonInput>

                <IonButton expand="full" type="submit">Login</IonButton>
              </form>

              <div className="ion-text-center">
                <p>
                  <a href="/forgot-password">Forgot Password?</a>
                </p>
                <p>
                  <a href="/createaccount">Create Account</a>
                </p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
