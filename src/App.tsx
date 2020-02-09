import React from 'react';
import {Provider} from 'react-redux';
import {initStore} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RollsContainer from './features/rolls/Rolls.container';
import AddRollContainer from './features/addRoll/AddRoll.container';
import {navigationRef} from './navigation/Navigation.service';
import {Routes} from './navigation/Routes';

const store = initStore();

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name={Routes.rolls}
            component={RollsContainer}
            options={{title: 'Dice Rolls'}}
          />
          <Stack.Screen name={Routes.addRoll} component={AddRollContainer} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
