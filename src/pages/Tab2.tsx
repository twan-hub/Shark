import React, { useEffect, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { add, logOut } from 'ionicons/icons';
import { useHistory } from 'react-router';
import Task from '../components/Task';

interface Task {
  id: number;
  userId: number;
  taskName: string;
  taskDetails: string;
  favorite: boolean;
}

interface Tab2Props {
  userId?: number;
  onLogout: () => void; // Callback function for logout
}

const Tab2: React.FC<Tab2Props> = ({ userId, onLogout }) => {
  const history = useHistory();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`http://localhost:8080/api/task/${userId}/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Allow requests from any origin
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setTasks(data); // Set the tasks received from the response
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  const handleAddButtonClick = () => {
    history.push("/tab2/todoadd");
  };

  const handleLogout = () => {
    localStorage.removeItem('sessionToken'); // Remove session token from local storage
    onLogout(); // Call the onLogout function passed from props
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" onClick={handleLogout}>
            <IonIcon icon={logOut} />
          </IonButton>
          <IonTitle className='ion-text-center'>To-Do List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">To-Do List</IonTitle>
          </IonToolbar>
        </IonHeader>
        {tasks.map((task) => (
          <Task key={task.id} name={task.taskName} />
        ))}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={handleAddButtonClick}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
