import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import RollsContainer from '../features/rolls/Rolls.container';
import {localization} from './Navigation.strings';
import {Colors} from '../layout/Colors';
import {Platform} from 'react-native';
import ActionButton from '../features/actionButton/ActionButton.container';
import AddRollContainer from '../features/roll-dice/RollDice.container';

const RollsStack = createStackNavigator();

export function RollsStackScreen() {
  return (
    <RollsStack.Navigator>
      <RollsStack.Screen
        name={Routes.rolls}
        component={RollsContainer}
        options={{
          title: localization.rolls_route_title,
          headerTintColor: Colors.accentColor,
          headerRight: () => (Platform.OS === 'ios' ? <ActionButton /> : null),
        }}
      />
      <RollsStack.Screen
        name={Routes.addRoll}
        component={AddRollContainer}
        options={{
          title: localization.add_roll_route_title,
          headerTintColor: Colors.accentColor,
        }}
      />
    </RollsStack.Navigator>
  );
}
