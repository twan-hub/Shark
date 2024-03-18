// Task.tsx
import React from 'react';
import { IonIcon, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonLabel } from '@ionic/react';
import { ellipseOutline, chevronForwardOutline, trash, eye, addCircleOutline, star } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface TaskProps {
    id: number;
    name: string;
    onDelete: (id: number) => void; // Callback function to handle delete
    onAddPriority: (id: number) => void; // Callback function to add priority
}

const Task: React.FC<TaskProps> = ({ id, name, onDelete, onAddPriority }) => {
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

    const handleAddPriorityClick = () => {
        onAddPriority(id); // Notify parent component to add priority
    };

    return (
        <IonItemSliding>
            <IonItem button={true} onClick={handleTaskClick} className='task-align'>
                <IonIcon icon={ellipseOutline} style={{ paddingRight: 10 }} />
                <IonLabel>{name}</IonLabel>
                <IonIcon icon={chevronForwardOutline} />
            </IonItem>
            <IonItemOptions slot="end">
                <IonItemOption color="success" expandable={true} onClick={handleAddPriorityClick}>
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
