import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { add, chevronUpCircle, colorPalette, globe } from 'ionicons/icons';

const TodoAdd: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="#"></IonBackButton>
        </IonButtons>
        <IonTitle>Back</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Todo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Todo" />
      </IonContent>
    </IonPage>
  );
};

export default TodoAdd;
