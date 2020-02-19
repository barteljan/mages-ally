import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigation/Navigation.service';
import FlashMessage from 'react-native-flash-message';
import {TabNavigation} from './navigation/Navigation.tabs';

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <TabNavigation />
        <FlashMessage position="top" />
      </Provider>
    </NavigationContainer>
  );
}

export default App;
