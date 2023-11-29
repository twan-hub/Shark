// Tab2.tsx
import React from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Tab2: React.FC = () => {
  const history = useHistory();

  const handleAddButtonClick = () => {
    history.push("/tab2/todoadd");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>To-Do List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">To-Do List</IonTitle>
          </IonToolbar>
        </IonHeader>
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
