import React, { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './TodoAdd.css';
import { useHistory } from 'react-router';

const TodoAdd: React.FC = () => {
  const [newTask, setNewTask] = useState<string>('');
  const [newDetails, setNewDetails] = useState<string>('');
  const [formValid, setFormValid] = useState<boolean>(false);
  const history = useHistory();

  const handleTaskChange = (e: CustomEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setNewTask(value);
    validateForm(value, newDetails);
  };

  const handleDetailChange = (e: CustomEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setNewDetails(value);
    validateForm(newTask, value);
  };

  const validateForm = (newTask: string, newDetails: string) => {
    if (newTask.trim() !== '' && newDetails.trim() !== '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('New Task:', newTask);
    console.log('Task Details:', newDetails);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center"> New Task </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit} className="ion-padding">
          <IonItem>
            <IonInput
              label="New Task"
              labelPlacement="floating"
              maxlength={20}
              onIonChange={handleTaskChange}
              value={newTask}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Additional Detail (Optional) "
              labelPlacement="floating"
              maxlength={20}
              counterFormatter={(inputLength, maxLength) =>
                `${maxLength - inputLength} characters remaining`
              }
              onIonChange={handleDetailChange}
              value={newDetails}
            ></IonInput>
          </IonItem>
          <div className="form-buttons">
            <IonButtons slot="start">
              <IonButton fill="clear" href="tab2">
                Back
              </IonButton>
            </IonButtons>

            <IonButtons slot="end">
              <IonButton
                type="submit"
                fill="clear"
                href="tab2"
                disabled={!formValid}
              >
                Save
              </IonButton>
            </IonButtons>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default TodoAdd;
