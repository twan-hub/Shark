import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list } from 'ionicons/icons';
import Tab2 from './pages/Tab2';
import TodoAdd from './pages/TodoAdd'; // Import TodoAdd component
import Login from './pages/Login';
import Registration from './pages/Registration';
import axios from 'axios';

// ... (CSS and setupIonicReact)
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import TaskInfo from './pages/TaskForm';
import TaskForm from './pages/TaskForm';
import TaskView from './pages/TaskView';

setupIonicReact();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number>();

  const handleLogin = (userId: number) => {
    setIsLoggedIn(true);
    setUserId(userId);
  };

  const handleRegister = (userId: number) => {
    setIsLoggedIn(true);
    setUserId(userId);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {isLoggedIn ? (
            <>
              <Route exact path="/tab2">
                <Tab2 userId={userId} onLogout={handleLogout} />
              </Route>
              <Route exact path="/todo-add">
                <TodoAdd userId={userId} />
              </Route>
              <Route path="/edit/:id">
                <TaskForm userId={userId} />
              </Route>
              <Route path="/view/:id">
                <TaskView userId={userId} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/login">
                <Login onLogin={handleLogin} />
              </Route>
              <Route path="/register">
                <Registration onRegister={handleRegister} />
              </Route>
              <Redirect to="/login" />
            </>
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
