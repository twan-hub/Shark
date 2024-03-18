import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

interface LoginProps {
  onLogin: (userId: number) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      if (response.status === 200) {
        const userId = response.data; // Assuming userId is returned from the server
        localStorage.setItem('sessionToken', response.data.sessionToken);
        history.push("/home");
        onLogin(userId);
      } else {
        console.log('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegisterClick = () => {
    history.push("/register");
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
          <div className='ion-padding'>
            <IonButton type='submit' expand="full">Login</IonButton>
          </div>
          <div className='ion-padding'>
            <IonButton expand="full" onClick={handleRegisterClick}>Register</IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;