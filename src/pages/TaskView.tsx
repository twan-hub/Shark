// TaskView.tsx

import React, { useState, useEffect } from 'react';
import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar, IonBackButton } from '@ionic/react';
import { chevronBack, pencilOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';


interface TaskViewProps {
    userId?: number;
}

const TaskView: React.FC<TaskViewProps> = ({ userId }) => {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<string>('');
    const [taskDetails, setTaskDetails] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        fetchTaskDetails();
    }, []);

    const fetchTaskDetails = () => {
        axios.get(`http://localhost:8080/api/task/${userId}/${id}`)
            .then(response => {
                const { taskName, taskDetails } = response.data;
                setTask(taskName);
                setTaskDetails(taskDetails);
            })
            .catch(error => {
                console.error('Error fetching task details:', error);
            });
    };

    const handleEditButtonClick = () => {
        history.push(`/edit/${id}`);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tab2" />
                    </IonButtons>
                    <IonTitle className='ion-text-center'>{task}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItem>
                    <IonInput color="primary" disabled={true} value={task}></IonInput>
                </IonItem>
                <IonItem>
                    <IonTextarea disabled={true} value={taskDetails} rows={5}></IonTextarea>
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