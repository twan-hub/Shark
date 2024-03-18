import React, {useEffect, useState} from 'react';
import Ingredient from '../../components/Drinks/Ingredients'; // Import the Ingredient component
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';

const DrinksPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = () => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then(response => {
        const { drinks } = response.data;
        const ingredientNames = drinks.map((drink: any) => drink.strIngredient1);
        setIngredients(ingredientNames);
      })
      .catch(error => {
        console.error('Error fetching ingredients:', error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Drinks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {ingredients.map((ingredient: any, index: any) => (
          <Ingredient key={index} name={ingredient} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default DrinksPage;


