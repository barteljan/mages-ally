import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import {SpellsScreen} from '../features/spells/Spells.screen';
import {localization} from './Navigation.strings';
import {Colors} from '../layout/Colors';
import AddSpellScreen from '../features/spells-add/AddSpell.container';
import SpellsAddButton from '../features/spells-add-button/SpellsAddButton.container';
import {Platform} from 'react-native';
//import { SpellsScreen } from 'src/features/spells/Spells.screen';

const SpellsStack = createStackNavigator();

export function SpellsStackScreen() {
  return (
    <SpellsStack.Navigator>
      <SpellsStack.Screen
        name={Routes.spells}
        component={SpellsScreen}
        options={{
          title: localization.spells_route_title,
          headerTintColor: Colors.accentColor,
          headerRight: () =>
            Platform.OS === 'ios' ? <SpellsAddButton /> : null,
        }}
      />
      <SpellsStack.Screen
        name={Routes.addSpell}
        component={AddSpellScreen}
        options={{
          title: localization.add_spell_route_title,
          headerTintColor: Colors.accentColor,
        }}
      />
    </SpellsStack.Navigator>
  );
}
