import React from 'react';
import { IonIcon, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonLabel } from '@ionic/react';
import { ellipseOutline, eye } from 'ionicons/icons';

interface IngredientProps {
  name: string; // Changed 'strIngredient1' to 'name' for clarity
}

const Ingredient: React.FC<IngredientProps> = ({ name }) => {
  const handleViewClick = () => {
    console.log('Viewing ingredient:', name);
  };

  return (
     <IonItemSliding>
       <IonItem button={true} className='task-align'>
         <IonIcon icon={ellipseOutline} style={{ paddingRight: 10 }} />
         <IonLabel>{name}</IonLabel>
       </IonItem>
       <IonItemOptions slot="end">
         <IonItemOption onClick={handleViewClick} color="primary" expandable={true}>
           <IonIcon slot="icon-only" icon={eye}></IonIcon>
         </IonItemOption>
       </IonItemOptions>
     </IonItemSliding>
  );
};

export default Ingredient;
