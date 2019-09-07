import React, { useReducer } from 'react';
import uuid from 'uuid';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'John Appleseed',
        email: 'johnappleseed@me.com',
        phone: '+912345678',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Jane Appleseed',
        email: 'janeappleseed@me.com',
        phone: '+913456789',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Jim Appleseed',
        email: 'jimappleseed@me.com',
        phone: '+914567890',
        type: 'professional'
      },
      {
        id: 4,
        name: 'Jen Appleseed',
        email: 'jennappleseed@me.com',
        phone: '+915678901',
        type: 'professional'
      }
    ]
  };

  const [state, dispacth] = useReducer(contactReducer, initialState);

  const addContact = contact => {
    contact.id = uuid.v4();
    dispacth({ type: ADD_CONTACT, payload: contact });
  };

  const deleteContact = id => {
    dispacth({ type: DELETE_CONTACT, payload: id });
  };

  return (
    <ContactContext.Provider
      value={{ contacts: state.contacts, addContact, deleteContact }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
