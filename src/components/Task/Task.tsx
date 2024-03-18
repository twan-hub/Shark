// Task.tsx
import React from 'react';
import { IonIcon, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonLabel } from '@ionic/react';
import { ellipseOutline, chevronForwardOutline, checkmarkCircleOutline, trash, eye, add, addCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface TaskProps {
    id: number;
    name: string;
    onDelete: (id: number) => void; // Callback function to handle delete
}

const Task: React.FC<TaskProps> = ({ id, name, onDelete }) => {
    const history = useHistory();

    const handleTaskClick = () => {
        // Redirect to TaskInfo page with the task ID in the URL
        history.push(`edit/${id}`);
    };
    
    const handleViewClick = () => {
        // Redirect to TaskView page with the task ID in the URL
        history.push(`view/${id}`);
    };

    const handleDeleteClick = () => {
        onDelete(id); // Notify parent component that task is deleted
    };

    return (
        <IonItemSliding>
            <IonItem button={true} onClick={handleTaskClick} className='task-align'>
                <IonIcon icon={ellipseOutline} style={{ paddingRight: 10 }} />
                <IonLabel>{name}</IonLabel>
                <IonIcon icon={chevronForwardOutline} />
            </IonItem>
            <IonItemOptions slot="end">
                <IonItemOption color="success" expandable={true}>
                    <IonIcon slot="icon-only" icon={addCircleOutline}></IonIcon>
                </IonItemOption>
                <IonItemOption onClick={handleViewClick} color="primary" expandable={true}>
                    <IonIcon slot="icon-only" icon={eye}></IonIcon>
                </IonItemOption>
                <IonItemOption color="danger" expandable={true} onClick={handleDeleteClick}>
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default Task;
