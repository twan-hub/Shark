import React from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { add, ellipseOutline, logOut } from 'ionicons/icons';
import { useHistory } from 'react-router';
import Task from '../components/Task';

interface Tab2Props {
  onLogout: () => void; // Define onLogout prop
}

const Tab2: React.FC<Tab2Props> = ({ onLogout }) => {
  const history = useHistory();

  const handleAddButtonClick = () => {
    history.push("/tab2/todoadd");
  }

  const handleLogoutClick = () => {
    onLogout(); // Call onLogout function passed from App component
  };

  const name = "Task Name";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" onClick={handleLogoutClick}>
            <IonIcon icon={logOut} />
          </IonButton>
          <IonTitle className='ion-text-center'>To-Do List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">To-Do List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Task name={name} />
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={handleAddButtonClick}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
