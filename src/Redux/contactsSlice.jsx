import { createSlice } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

const initialState = [];

export const contactsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setContactsAction: (state, action) => [...state, action.payload],
    delContactsAction: (state, action) => state.filter(contact => contact.id !== action.payload)
  },
});

export const { setContactsAction, delContactsAction } = contactsSlice.actions;

// Selectors
export const getContactsArrive = state => state.contacts.items;
