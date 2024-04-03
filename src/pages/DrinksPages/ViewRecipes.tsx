import React, {useEffect, useState} from 'react';
import Ingredient from '../../components/Drinks/Ingredients'; // Import the Ingredient component
import axios from 'axios';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonLoading } from '@ionic/react';
import { chevronBack} from 'ionicons/icons';
import { useHistory, useLocation, useParams } from 'react-router';
import DisplayRecipeName from '../../components/Drinks/DisplayRecipeName';



const ViewRecipes: React.FC = () => {
    const { name } = useParams<{ name: string }>();
  const [drinkNames, setDrinkNames] = useState<string[]>([]);
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = () => {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`)
      .then(response => {
        const { drinks } = response.data;
        const drinksNames = drinks.map((drink: any) => drink.strDrink);
        setDrinkNames(drinksNames);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching ingredients:', error);
        setLoading(false); 
      });
  };


  const handleBackButtonClick = () => {
    history.goBack();
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
                        <IonButton onClick={handleBackButtonClick}>
                            <IonIcon icon={chevronBack} />
                        </IonButton>
                    </IonButtons>
        <IonTitle className='ion-text-center'>Drinks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      {loading ? (
          <IonLoading isOpen={loading} message="Loading Recipes..." />
        ) : (
          drinkNames.map((ingredient: any, index: any) => (
            <DisplayRecipeName key={index} name={ingredient} />
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewRecipes;

