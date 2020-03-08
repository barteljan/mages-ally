import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigation/Navigation.service';
import FlashMessage from 'react-native-flash-message';
import {TabNavigation} from './navigation/Navigation.tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './layout/Theme';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'componentWillReceiveProps has been renamed',
  'componentWillMount has been renamed',
]);

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <TabNavigation />
          <FlashMessage position="top" />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
