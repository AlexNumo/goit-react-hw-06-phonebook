import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { contactsSlice } from './contactsSlice';
import { filterSlice } from './filterSlice';

//LocalStorage
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    items: contactsSlice.reducer,
    filter: filterSlice.reducer,
});

const persistConfig = {
    key: 'phones',
    storage,
    whitelist: ['items'],
};

const persistContactsReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        contacts: persistContactsReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    }),
});

export const persistor = persistStore(store);