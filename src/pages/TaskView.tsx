// Tab2.tsx

import React, { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote, IonPage, IonTextarea, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { add, addCircleOutline, checkmarkCircleOutline, chevronBack, chevronForwardOutline, ellipseOutline, pencilOutline, trash } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import Task from '../components/Task';

const TaskView: React.FC = () => {
    const history = useHistory();
    const { name } = useParams<{ name: string }>();
    const [taskDetails, setTaskDetails] = useState("");

    const handleEditButtonClick = () => {
        history.push(`/tab2/taskEdit/${name}`);
    }

    const [newTask, setNewTask] = useState<string>('');
    const [newDetails, setNewDetails] = useState<string>('');
    const [formValid, setFormValid] = useState<boolean>(false);

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


    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('New Task:', newTask);
        console.log('Task Details:', newDetails);
        history.push(`/tab2/taskEdit/`);
    };




    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
                    <IonTitle className='ion-text-center'>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonItem>
                    <IonInput color="primary" disabled={true} label="Task :" label-placement="floating" value={name} clearInput={true}></IonInput>
                </IonItem>
                <IonItem>
                    <IonTextarea disabled={true} onIonChange={handleDetailChange} label="Task Details :" label-placement="floating" rows={5}>{taskDetails}</IonTextarea>
                </IonItem>
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton onClick={handleEditButtonClick}>
                        <IonIcon icon={pencilOutline} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default TaskView;