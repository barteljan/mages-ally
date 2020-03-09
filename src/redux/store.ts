import {rootReducer, RootAction} from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore, createMigrate} from 'redux-persist';
import storage from '@react-native-community/async-storage';
import {applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {AppState, makeAppState} from './AppState';
import {configureEpics} from './configureEpics';
import {migrations} from './migrations';

const persistConfig = {
  key: 'mage',
  storage,
  version: 7,
  migrate: createMigrate(migrations, {debug: true}),
};

//@ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, AppState>();

export const store = createStore(
  persistedReducer,
  makeAppState(),
  composeWithDevTools(applyMiddleware(epicMiddleware)),
);
configureEpics(epicMiddleware);

export const persistor = persistStore(store);
