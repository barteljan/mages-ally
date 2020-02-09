import React from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {initStore} from './redux/store';

const store = initStore();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Provider store={store}>
          <View>
            <Text>App created</Text>
          </View>
        </Provider>
      </SafeAreaView>
    </>
  );
};

export default App;
