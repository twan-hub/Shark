// Task.tsx

import React from 'react';
import { IonIcon, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonLabel, IonNote } from '@ionic/react';
import { ellipseOutline, chevronForwardOutline, checkmarkCircleOutline, trash, eye } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface TaskProps {
    name: string;
}

const Task: React.FC<TaskProps> = ({ name }) => {
    const history = useHistory();

    const handleTaskClick = () => {
        // Redirect to TaskInfo page with the task name in the URL
        history.push(`/tab2/taskinfo/${name}`);
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
                    <IonIcon slot="icon-only" icon={checkmarkCircleOutline}></IonIcon>
                </IonItemOption>
                <IonItemOption color="primary" expandable={true}>
                    <IonIcon slot="icon-only" icon={eye}></IonIcon>
                </IonItemOption>
                <IonItemOption color="danger" expandable={true}>
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default Task;

