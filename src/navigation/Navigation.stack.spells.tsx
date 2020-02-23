import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import {localization} from './Navigation.strings';
import EditSpellScreen from '../features/spells/edit/AddSpell.container';
import AddButton from '../features/spells/add-button/SpellsAddButton.container';
import {Platform} from 'react-native';
import {theme} from '../layout/Theme';

const SpellsStack = createStackNavigator();

export function SpellsStackScreen() {
  return (
    <SpellsStack.Navigator>
      <SpellsStack.Screen
        name={Routes.spells}
        component={EditSpellScreen}
        options={{
          title: localization.spells_route_title,
          headerTintColor: theme.colors.accent,
          headerRight: () => (Platform.OS === 'ios' ? <AddButton /> : null),
        }}
      />
      <SpellsStack.Screen
        name={Routes.addSpell}
        component={EditSpellScreen}
        options={{
          title: localization.add_spell_route_title,
          headerTintColor: theme.colors.accent,
        }}
      />
    </SpellsStack.Navigator>
  );
}
