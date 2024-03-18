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
import Home from './pages/TabPages/Home';
import TaskAdd from './pages/TaskPages/TaskAdd';
import TaskUpdate from './pages/TaskPages/TaskUpdate';
import Login from './pages/AuthPages/Login';
import Registration from './pages/AuthPages/Registration';
import TaskView from './pages/TaskPages/TaskView';

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
              <Route exact path="/home">
                <Home userId={userId} onLogout={handleLogout} />
              </Route>
              <Route exact path="/add">
                <TaskAdd userId={userId} />
              </Route>
              <Route path="/edit/:id">
                <TaskUpdate userId={userId} />
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