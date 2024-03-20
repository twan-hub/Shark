import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

interface RecipeProps {
  name: string;
  instructions: string;
  ingredients: string[];
  measurements: string[];
}

const Recipe: React.FC<RecipeProps> = ({ name, instructions, ingredients, measurements }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{name}</IonCardSubtitle>
        <IonCardTitle>Instructions</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{instructions}</p>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Measurements</h3>
        <ul>
          {measurements.map((measurement, index) => (
            <li key={index}>{measurement}</li>
          ))}
        </ul>
      </IonCardContent>
    </IonCard>
  );
};

export default Recipe;
