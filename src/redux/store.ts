import {rootReducer} from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import storage from '@react-native-community/async-storage';
import {AnyAction, applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {AppState} from './AppState';
import {configureEpics} from './configureEpics';

const persistConfig = {
  key: 'mage',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState>();

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware)),
);
configureEpics(epicMiddleware);

export const persistor = persistStore(store);
