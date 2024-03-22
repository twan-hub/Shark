import React, { useState } from 'react';
import axios from 'axios';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import { useHistory } from 'react-router';

interface RegistrationProps {
  onRegister: (userId: number) => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorToastMessage, setErrorToastMessage] = useState('');

  const history = useHistory();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9]{3,20}$/.test(username)) {
      setErrorToastMessage('Username must be between 3-20 characters and contain letters only no numbers');
      return;
    } else if (password.length < 5 || password.length > 20 || !/^[a-zA-Z0-9]{3,20}$/.test(password)) {
      setErrorToastMessage('Password must be between 5-20 characters and contain letters only');
      return;
    } else if (password !== verifyPassword) {
      setErrorToastMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', { username, password, verifyPassword });
      const userId = response.data; // Assuming response.data directly contains the userId as a number

      if (typeof userId === 'number' && userId > 0) { // Check if userId is a valid positive number
        history.push("/home");
        onRegister(userId);
      } else {
        console.error('Registration failed');
        setErrorToastMessage('Registration Failed. Try a Different Username');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorToastMessage('Error during registration. Please try again later.');
    }
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleRegister}>
          <IonItem className='ion-padding' lines="full">
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput
              type="text"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              required
            ></IonInput>
          </IonItem>
          <IonItem className='ion-padding' lines="full">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              required
            ></IonInput>
          </IonItem>
          <IonItem className='ion-padding' lines="full">
            <IonLabel position="stacked">Verify Password</IonLabel>
            <IonInput
              type="password"
              value={verifyPassword}
              onIonChange={(e) => setVerifyPassword(e.detail.value!)}
              required
            ></IonInput>
          </IonItem>
          <div className='ion-padding'>
            <IonButton type='submit' expand="full">Register</IonButton>
          </div>
          <div className='ion-padding'>
            <IonButton expand="full" onClick={handleLoginClick}>Login</IonButton>
          </div>
        </form>
        <IonToast
          isOpen={!!errorToastMessage}
          onDidDismiss={() => setErrorToastMessage('')}
          message={errorToastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Registration;
