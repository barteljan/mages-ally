import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import RollsContainer from '../features/rolls/Rolls.container';
import {localization} from './Navigation.strings';
import {Platform} from 'react-native';
import RollsAddButton from '../features/rolls/add-button/RollsAddButton.container';
import AddRollContainer from '../features/roll-dice/RollDice.container';
import {theme} from '../layout/Theme';

const RollsStack = createStackNavigator();

export function RollsStackScreen() {
  return (
    <RollsStack.Navigator>
      <RollsStack.Screen
        name={Routes.rolls}
        component={RollsContainer}
        options={{
          title: localization.rolls_route_title,
          headerTintColor: theme.colors.primary,
          headerRight: () =>
            Platform.OS === 'ios' ? <RollsAddButton /> : null,
        }}
      />
      <RollsStack.Screen
        name={Routes.addRoll}
        component={AddRollContainer}
        options={{
          title: localization.add_roll_route_title,
          headerTintColor: theme.colors.primary,
        }}
      />
    </RollsStack.Navigator>
  );
}
