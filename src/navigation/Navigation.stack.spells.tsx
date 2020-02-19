import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import {SpellsScreen} from '../features/spells/Spells.screen';
import {localization} from './Navigation.strings';
import {Colors} from '../layout/Colors';

const SpellsStack = createStackNavigator();

export function SpellsStackScreen() {
  return (
    <SpellsStack.Navigator>
      <SpellsStack.Screen
        name={Routes.rolls}
        component={SpellsScreen}
        options={{
          title: localization.rolls_route_title,
          headerTintColor: Colors.accentColor,
        }}
      />
    </SpellsStack.Navigator>
  );
}
