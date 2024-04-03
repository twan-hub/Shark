
import React, { useEffect, useState } from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonButton, IonToast } from '@ionic/react';
import { add, logOut, star } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router';
import Task from '../../components/Task/Task';
import axios from 'axios';

interface Task {
  id: number;
  userId: number;
  taskName: string;
  taskDetails: string;
  favorite: boolean;
}

interface HomeProps {
  userId?: number;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ userId, onLogout }) => {
  const history = useHistory();
  const location = useLocation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ToastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (location.pathname === '/home') {
      fetchTasks();
    }
  }, [location.pathname]);

  const fetchTasks = () => {
    fetch(`http://localhost:8080/api/task/${userId}/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setTasks(data); 
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  const handleAddButtonClick = () => {
    history.push("/add");
  };

  const handleLogout = () => {
    localStorage.removeItem('sessionToken'); 
    onLogout();
    history.push("login"); 
  };

  const handleDeleteTask = (id: number) => {
    axios.delete(`http://localhost:8080/api/task/${userId}/${id}`)
        .then(response => {
            console.log('Task deleted successfully:', response.data);
            fetchTasks();
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
  };

  const handleAddPriority = (id: number) => {
   
    axios.post(`http://localhost:8080/api/favorite/${userId}/${id}`)
        .then(response => {
            console.log('Priority added successfully:', response.data);
            setToastMessage("Successfully Added");
            fetchTasks();
        })
        .catch(error => {
            console.error('Error adding priority:', error);
            setToastMessage("Unsuccessfully Added");
        });
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
          <Task key={task.id} id={task.id} name={task.taskName} onDelete={handleDeleteTask} onAddPriority={handleAddPriority}/>
        ))}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={handleAddButtonClick}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonToast
          isOpen={!!ToastMessage}
          onDidDismiss={() => setToastMessage('')}
          message={ToastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
