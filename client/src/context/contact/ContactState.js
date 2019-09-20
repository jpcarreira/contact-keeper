import React, { useReducer } from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
  CONTACT_ERROR
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispacth] = useReducer(contactReducer, initialState);

  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispacth({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispacth({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispacth({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispacth({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  const deleteContact = id => {
    dispacth({ type: DELETE_CONTACT, payload: id });
  };

  const setCurrent = contact => {
    dispacth({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispacth({ type: CLEAR_CURRENT });
  };

  const updateContact = contact => {
    dispacth({ type: UPDATE_CONTACT, payload: contact });
  };

  const filterContacts = text => {
    dispacth({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispacth({ type: CLEAR_FILTER });
  };

  const clearContacts = () => {
    dispacth({ type: CLEAR_CONTACTS });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
