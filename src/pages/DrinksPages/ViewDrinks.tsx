import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import Recipe from '../../components/Drinks/Recipe';
import { IonContent, IonLoading, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/react';
import { chevronBack} from 'ionicons/icons';


const ViewRecipes: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        if (isMounted) {
          setRecipes(data.drinks || []);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecipes();

    return () => {
      isMounted = false;
    };
  }, [name]);

  const handleBackButtonClick = () => {
    history.goBack();
}

  if (loading) {
    return <IonLoading isOpen={loading} message="Loading recipes..." />;
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
        {recipes.length === 0 ? (
          <p>No recipes found for {name}</p>
        ) : (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.idDrink}
              name={recipe.strDrink}
              instructions={recipe.strInstructions}
              ingredients={getIngredients(recipe)}
              measurements={getMeasurements(recipe)}
            />
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

const getIngredients = (recipe: any) => {
  const ingredients: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
};

const getMeasurements = (recipe: any) => {
  const measurements: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const measurement = recipe[`strMeasure${i}`];
    if (measurement) {
      measurements.push(measurement);
    }
  }
  return measurements;
};

export default ViewRecipes;
