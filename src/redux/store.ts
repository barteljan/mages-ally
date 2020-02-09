import {rootReducer} from './rootReducer';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer} from 'redux-persist';
import storage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'mage',
  storage,
  version: 1,
};

let persistedReducer = persistReducer(persistConfig, rootReducer);

export const initStore = () =>
  createStore(persistedReducer, undefined, composeWithDevTools());
