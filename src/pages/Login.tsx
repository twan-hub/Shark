import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e: CustomEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setEmail(value);
    validateForm(value, password);
  };

  const handlePasswordChange = (e: CustomEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setPassword(value);
    validateForm(email, value);
  };

  const validateForm = (email: string, password: string) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regex for basic email validation

    setFormValid(isValidEmail && password.trim().length >= 8);
    setEmailError(isValidEmail ? '' : 'Invalid email format');
    setPasswordError(password.trim().length >= 8 ? '' : 'Must be 8 characters min');
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Perform authentication logic here
    if (formValid) {
      // Simulate successful login and obtain user token
      const userToken = 'your_user_token_here';

      // Save user token to localStorage
      localStorage.setItem('userToken', userToken);

      // Call onLogin prop to indicate successful login
      onLogin(); 
    } else {
      console.log('Invalid email or password');
      // Show error message to the user or perform other actions for unsuccessful login
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleLogin}>
          <IonItem className='ion-padding' lines="full">
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={handleEmailChange}
              required
              color={emailError ? 'danger' : ''}
            ></IonInput>
            {emailError && (
              <IonLabel color="danger">{emailError}</IonLabel>
            )}
          </IonItem>
          <IonItem className='ion-padding' lines="full">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={handlePasswordChange}
              required
              color={passwordError ? 'danger' : ''}
            ></IonInput>
            {passwordError && (
              <IonLabel color="danger">{passwordError}</IonLabel>
            )}
          </IonItem>
          <div className='ion-padding'>
            <IonButton type='submit' expand="full" disabled={!formValid}>Login</IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;

