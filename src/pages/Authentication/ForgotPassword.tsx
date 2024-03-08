// ForgotPassword.tsx
import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonLabel, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './../../master.css'

interface ForgotPasswordProps {
  onPasswordReset: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onPasswordReset }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add logic to send a password reset email
    // ...

    // Assume the password reset was successful
    onPasswordReset();
    history.push('/login');
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1 className="ion-text-center">Forgot Password</h1>
        <form onSubmit={handleResetPassword}>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>

          <IonButton expand="full" type="submit">Reset Password</IonButton>
        </form>

        <div className="ion-text-center">
          <p>
            <a href="/login">Log in!</a>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
