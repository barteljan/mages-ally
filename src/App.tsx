import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RollsContainer from './features/rolls/Rolls.container';
import AddRollContainer from './features/roll-dice/RollDice.container';
import {navigationRef} from './navigation/Navigation.service';
import {Routes} from './navigation/Routes';
import ActionButton from './features/actionButton/ActionButton.container';
import {Platform} from 'react-native';
import {Colors} from './layout/Colors';
import {localization} from './navigation/Navigation.strings';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name={Routes.rolls}
            component={RollsContainer}
            options={{
              title: localization.rolls_route_title,
              headerTintColor: Colors.accentColor,
              headerRight: () =>
                Platform.OS === 'ios' ? <ActionButton /> : null,
            }}
          />
          <Stack.Screen
            name={Routes.addRoll}
            component={AddRollContainer}
            options={{
              title: localization.add_roll_route_title,
              headerTintColor: Colors.accentColor,
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
