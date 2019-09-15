import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null
  };

  const [state, dispacth] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('api/auth');
      dispacth({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispacth({
        type: AUTH_ERROR
      });
    }
  };

  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('api/users', formData, config);

      dispacth({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispacth({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('api/auth', formData, config);

      dispacth({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispacth({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  const logout = () => {
    dispacth({ type: LOGOUT });
  };

  const clearErrors = () => {
    dispacth({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
