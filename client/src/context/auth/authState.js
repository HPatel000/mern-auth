import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('authToken'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  // load user
  const loadUser = async () => {
    if (localStorage.authToken) {
      setAuthToken(localStorage.authToken);
    }
    try {
      const res = await axios.get('./api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  }

  // Register user
  const register = async userData => {
    try {
      const res = await axios.post('/api/users', userData);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error });
    }
  }

  // login user
  const login = async userData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/auth', userData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  }

  // logout
  const logout = () => dispatch({ type: LOGOUT });

  // clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors
      }}>
      {props.children}
    </authContext.Provider>
  )
}

export default AuthState;