import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './TodoAdd.css';
import { add, chevronUpCircle, colorPalette, globe } from 'ionicons/icons';

const TodoAdd: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center"> New Task </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <IonInput label="New Task" labelPlacement="floating" maxlength={20}></IonInput>

        <IonInput
          label="Additional Detail (Optional) "
          labelPlacement="floating"
          maxlength={20}
          counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
        ></IonInput>
        </div>
        
        <div>
          <IonButtons>
            <IonButton fill="clear" href="#">Back</IonButton>
          </IonButtons>

          <IonButtons>
            <IonButton fill="clear" href="tab2">Save</IonButton>
          </IonButtons>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default TodoAdd;
