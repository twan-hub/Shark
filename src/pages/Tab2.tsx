// Tab2.tsx

import React from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add, ellipseOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import Task from '../components/Task';

const Tab2: React.FC = () => {
  const history = useHistory();

  const handleAddButtonClick = () => {
    history.push("/tab2/todoadd");
  }

  const name = "Task Name";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
