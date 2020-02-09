import React from 'react';
import {Provider} from 'react-redux';
import {initStore} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RollsContainer from './features/rolls/Rolls.container';
import AddRollContainer from './features/addRoll/AddRoll.container';

const store = initStore();

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="Rolls"
            component={RollsContainer}
            options={{title: 'Dice Rolls'}}
          />
          <Stack.Screen name="AddRoll" component={AddRollContainer} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
