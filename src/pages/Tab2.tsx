// Tab2.tsx
import React from 'react';
import { IonAccordion, IonAccordionGroup, IonAvatar, IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add, caretDownCircle, chevronForwardOutline, ellipseOutline, pin, share, trash } from 'ionicons/icons';
import { useHistory } from 'react-router';
import "./Tab2.css"
const Tab2: React.FC = () => {
  const history = useHistory();

  const handleAddButtonClick = () => {
    history.push("/tab2/todoadd");
  }

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
        <IonList inset={true}>
          <IonItemSliding>
            <IonItem button={true}>
              <IonIcon icon={ellipseOutline} style={{
                paddingRight:10
              }}/>
              <IonLabel>Rick Astley</IonLabel>
              <IonIcon icon={chevronForwardOutline}/>
            </IonItem>
            <IonItemOptions slot="end">
              <IonItemOption color="danger" expandable={true}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
          </IonList>
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
