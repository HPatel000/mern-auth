import './App.css';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';
import setAuthToken from './utils/setAuthToken';
import Alerts from './components/layouts/alert';
import Home from './components/pages/home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Fragment } from 'react';
import Registration from './components/auth/registration';
import Login from './components/auth/login';
import PrivateRoute from './components/routing/privateRoute';

if (localStorage.authToken) {
  setAuthToken(localStorage.authToken);
}

const App = () => {

  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Alerts />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Registration} />
            </Switch>
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;
