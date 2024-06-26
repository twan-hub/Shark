import React from 'react';
import { IonIcon, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonLabel } from '@ionic/react';
import { ellipseOutline, eye } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface IngredientProps {
    name: string; // Changed 'strIngredient1' to 'name' for clarity
}

const Ingredient: React.FC<IngredientProps> = ({ name }) => {

    const history = useHistory()
    const handleViewClick = () => {
        console.log('Viewing ingredient:', name);
        history.push(`/recipes/${name}`)
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

export default Ingredient;
