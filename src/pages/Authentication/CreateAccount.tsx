// CreateAccount.tsx
import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonGrid, IonRow, IonCol, IonLabel, IonToast, IonRouterLink, IonButton, IonText, IonItem  } from '@ionic/react';
import IonTooltip from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './../../master.css'
import './CreateAccount.css'; // You can create a CSS file for styling if needed

interface CreateAccountProps {
  onCreateAccountSuccess: () => void; // Function to call when account creation is successful
}

const CreateAccount: React.FC<CreateAccountProps> = ({ onCreateAccountSuccess }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null); 

  const [showEmailTooltip, setShowEmailTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowEmailTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowEmailTooltip(false);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    // Email validation logic
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsEmailValid(emailRegex.test(value));
  };

  const validatePasswordStrength = (password: string): boolean => {
    // Regular expression for password strength validation
    // Example: At least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleCreateAccount = async () => {

    // Validate password strength
    if (!validatePasswordStrength(password)) {
      setMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setMessage('Password and confirm password do not match.');
      return;
    }

    console.log('Creating account...'); // Log account creation attempt
    setLoading(true); // Set loading to true when account creation process starts

    try {
      // Implement your account creation logic here
      // Example fetch request to an API endpoint
      // Replace 'your-api-endpoint' with the actual endpoint URL
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      // Extract response data
      const data = await response.json();

      // Check if account creation was successful
      if (response.ok) {
        setMessage('Account created successfully.');
        onCreateAccountSuccess(); // Call the callback function
        history.push('/login'); // Redirect to the login page after successful account creation
      } else {
        // Handle account creation failure
        setMessage(data.message || 'Failed to create account.');
      }
    } catch (error) {
      console.error('Error during account creation:', error);
      setMessage('An error occurred during account creation. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="8" sizeMd="6" sizeLg="4">
              <h1 className="ion-text-center">Create Account</h1>
              <IonToast
                isOpen={!!message}
                message={message || ''}
                duration={3000}
                onDidDismiss={() => setMessage(null)}
                color="danger"
                position="top"
              />
              <form onSubmit={(e) => { e.preventDefault(); handleCreateAccount(); }}>
              <IonInput
                type="text"
                value={email}
                placeholder='Email'
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                onIonChange={(e) => handleEmailChange(e.detail.value!)}
                style={{
                    marginBottom: '15px',
                    padding: '10px',
                    border: `1px solid ${email && !isEmailValid ? 'red' : '#ccc'}`, // Apply red border if email is invalid and not empty
                    borderRadius: '4px',
                    borderBottom: `2px solid ${isEmailValid ? 'green' : 'transparent'}`, // Apply green bottom border if email is valid
                }}
                />
                {email && !isEmailValid && <p style={{ color: 'red' }}>Invalid email structure.</p>}
                
                <IonInput
                  type="text"
                  value={username}
                  placeholder='UserName'
                  onIonChange={(e) => setUsername(e.detail.value!)}
                  style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                ></IonInput>

                <IonInput
                  type="password"
                  value={password}
                  placeholder='Password'
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                ></IonInput>

                <IonInput
                  type="password"
                  value={confirmPassword}
                  placeholder='Confirm Password'
                  onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                  style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                ></IonInput>
                <IonItem lines="none" className="ion-justify-content-center">
                    <IonButton
                    type="submit"
                    className="ion-button"
                    disabled={loading}
                    style={{ width: '100%', maxWidth: '300px' }} // Adjust width as needed
                    >
                    {loading ? 'Creating account...' : 'Create Account'}
                    </IonButton>
                </IonItem>
              </form>

              <div className="ion-text-center">
                <p>
                  <IonRouterLink href="/login">Back to Login</IonRouterLink>
                </p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;
