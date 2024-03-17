import React, { useState, useEffect } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

interface TaskFormProps {
    userId?: number;
}

const TaskForm: React.FC<TaskFormProps> = ({ userId }) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const [task, setTask] = useState<string>('');
    const [details, setDetails] = useState<string>('');

    useEffect(() => {
        console.log('IS:', id);
        fetchTaskDetails();
    }, []);

    const fetchTaskDetails = () => {
        axios.get(`http://localhost:8080/api/task/${userId}/${id}`)
            .then(response => {
                const { taskName, taskDetails } = response.data;
                setTask(taskName);
                setDetails(taskDetails);
            })
            .catch(error => {
                console.log(id)
                console.error('Error fetching task details:', error);
            });
    };

    const handleBackButtonClick = () => {
        history.goBack();
    }

    const handleTaskChange = (e: CustomEvent) => {
        const value = (e.target as HTMLInputElement).value;
        setTask(value);
    };

    const handleDetailChange = (e: CustomEvent) => {
        const value = (e.target as HTMLInputElement).value;
        setDetails(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedTask = {
            taskName: task,
            taskDetails: details
        };

        axios.put(`http://localhost:8080/api/task/${userId}/${id}`, updatedTask)
            .then(response => {
                console.log('Task updated successfully:', response.data);
                history.goBack();
            })
            .catch(error => {
                console.error('Error updating task:', error);
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
                    <IonTitle className="ion-text-center">Edit Task</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit} className="ion-padding">
                    <IonItem>
                        <IonInput value={task} placeholder="Task" onIonChange={handleTaskChange}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonTextarea value={details} placeholder="Task Details" onIonChange={handleDetailChange} rows={5}></IonTextarea>
                    </IonItem>
                    <IonButton type="submit" expand="block">Save</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default TaskForm;
