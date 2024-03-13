// TaskForm.tsx

import React, { useState } from 'react';
import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote, IonPage, IonTextarea, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { add, addCircleOutline, checkmarkCircleOutline, chevronBack, chevronForwardOutline, ellipseOutline, trash } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import Task from '../components/Task';

const TaskForm: React.FC = () => {
    const history = useHistory();
    const { name } = useParams<{ name: string }>();

    const handleBackButtonClick = () => {
        history.goBack();
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


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('New Task:', newTask);
        console.log('Task Details:', newDetails);
        history.goBack();
    };




    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className='ion-text-center'>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <form onSubmit={handleSubmit} className="ion-padding">
                    <IonItem>
                        <IonInput onIonChange={handleTaskChange} label="Task :" label-placement="floating" value={name} clearInput={true}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonTextarea onIonChange={handleDetailChange} label="Task Details :" label-placement="floating" rows={5}></IonTextarea>
                    </IonItem>
                    <div className="form-buttons">
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
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton onClick={handleBackButtonClick}>
                        <IonIcon icon={chevronBack} />
                    </IonFabButton>
                </IonFab>
                </IonContent>
        </IonPage>
    );
};

export default TaskForm;