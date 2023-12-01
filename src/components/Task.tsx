import React from 'react';
import {
    IonAvatar,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { chevronForwardOutline, ellipseOutline, pin, share, trash } from 'ionicons/icons';

interface TaskProps {
    name:string;
}
const  Task: React.FC<TaskProps> = ({ name }) => {
    return (
        <>
            <IonItemSliding>
                <IonItem button={true}>
                    <IonIcon icon={ellipseOutline} style={{
                        paddingRight: 10
                    }} />
                    <IonLabel>{name}</IonLabel>
                    <IonIcon icon={chevronForwardOutline} />
                </IonItem>
                <IonItemOptions slot="end">
                    <IonItemOption color="danger" expandable={true}>
                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        </>
    );
}
export default Task;