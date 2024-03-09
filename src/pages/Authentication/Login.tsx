// Login.tsx
import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonGrid, IonRow, IonCol, IonLabel, IonToast, IonRouterLink, IonButton, IonItem } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './../../master.css'
import './Login.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [message, setMessage] = useState<string | null>(null); // Added state to store the message

  console.log('Props:', { onLoginSuccess }); // Log received props

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in...'); // Log login attempt
    setLoading(true); // Set loading to true when login process starts

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

      // Extract body from response
      const { result } = await response.json();
      const message = result[0].msg;

      if (message === 'User Invalid') {
        setMessage(message);
        console.error('Login failed');
        setLoading(false); // Reset loading state on failure
        return;
      }

      onLoginSuccess();
      history.push('/tab1');
    } catch (error) {
      console.error('Error during login:', error);
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">
              <h1 className="ion-text-center">Login</h1>
              <IonToast
                isOpen={!!message}
                message={message || ''}
                duration={3000}
                onDidDismiss={() => setMessage(null)}
                color="danger"
                position="top"
              />
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
                >
                </IonInput>
                
                    <IonButton
                      type="submit"
                      expand="full"
                      disabled={loading}
                      style={{ width: '100%'}} // Adjust width as needed
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </IonButton>
                 
              </form>

              <div className="ion-text-center">
                <p>
                  <IonRouterLink href="/forgot-password">Forgot Password?</IonRouterLink>
                </p>
                <p>
                  <IonRouterLink href="/create-account">Create Account</IonRouterLink>
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
