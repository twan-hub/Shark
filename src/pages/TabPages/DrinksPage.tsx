import React, { useEffect, useState } from 'react';
import Ingredient from '../../components/Drinks/Ingredients';
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonIcon, IonTitle, IonToolbar, IonButton, IonLoading } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface DrinksPageProps {
    onLogout: () => void; 
}

const DrinksPage: React.FC<DrinksPageProps> = ({onLogout}) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const history = useHistory();

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = () => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then(response => {
        const { drinks } = response.data;
        const ingredientNames = drinks.map((drink: any) => drink.strIngredient1);
        setIngredients(ingredientNames);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching ingredients:', error);
        setLoading(false); 
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');  
    onLogout();
    history.push("login"); 
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" onClick={handleLogout}>
            <IonIcon icon={logOut} />
          </IonButton>
          <IonTitle className='ion-text-center'>Drinks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <IonLoading isOpen={loading} message="Loading drinks..." />
        ) : (
          ingredients.map((ingredient: any, index: any) => (
            <Ingredient key={index} name={ingredient} />
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default DrinksPage;