import React, { useState } from 'react';
import axios from 'axios';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  IonToast,
} from '@ionic/react';
import '../../styles/TaskAdd.css';
import { useHistory } from 'react-router';
import { chevronBack } from 'ionicons/icons';

interface TaskAddProps {
  userId?: number;
}

const TaskAdd: React.FC<TaskAddProps> = ({ userId }) => {
  const [newTask, setNewTask] = useState<string>('');
  const [newDetails, setNewDetails] = useState<string>('');
  const [formValid, setFormValid] = useState<boolean>(false);
  const history = useHistory();

  const handleBackButtonClick = () => {
    history.goBack();
  }

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
    if (newTask.trim() !== '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    axios.post(`http://localhost:8080/api/task/${userId}/create`, {
      taskName: newTask,
      taskDetails: newDetails
    })
    .then(response => {
      console.log('Task created successfully:', response.data);
      history.goBack();
    })
    .catch(error => {
      console.error('Error creating task:', error);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBackButtonClick}>
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonButtons>
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
            <IonButtons slot="end">
              <IonButton
                type="submit"
                fill="clear"
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

export default TaskAdd;
