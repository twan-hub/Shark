import React from 'react';
import { IonIcon, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonLabel } from '@ionic/react';
import { ellipseOutline, eye } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface DisplayRecipeNameProps {
    name: string; 
}

const DisplayRecipeName: React.FC<DisplayRecipeNameProps> = ({ name }) => {

    const history = useHistory()
    const handleViewClick = () => {
        console.log('Viewing ingredient:', name);
        history.push(`/recipe/${name}`)
    };

    return (
        <IonItemSliding>
            <IonItem button={true} className='task-align' onClick={handleViewClick}>
                <IonIcon icon={ellipseOutline} style={{ paddingRight: 10 }} />
                <IonLabel>{name}</IonLabel>
            </IonItem>
            <IonItemOptions slot="end">
                <IonItemOption color="primary" expandable={true}>
                    <IonIcon slot="icon-only" icon={eye}></IonIcon>
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default DisplayRecipeName;
