import React, { useContext } from 'react';
import authContext from '../../context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const AuthContext = useContext(authContext);
  const { isAuthenticated, loading } = AuthContext;

  return (
    <Route {...rest} render={
      props =>
        !isAuthenticated && !loading
          ? <Redirect to='/login' />
          : <Component {...props} />
    }
    />
  );
}

export default PrivateRoute;