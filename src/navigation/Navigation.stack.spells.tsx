import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import {localization} from './Navigation.strings';
import EditSpellScreen from '../features/spells/edit/AddSpell.container';
import AddButton from '../features/spells/add-button/SpellsAddButton.container';
import ChooseYantrasScreen from '../features/spells/edit/ChooseYantraScreen/ChooseYantra.container';
import {Platform} from 'react-native';
import {theme} from '../layout/Theme';
import SpellsScreen from '../features/spells/Spells.container';

const SpellsStack = createStackNavigator();

export function SpellsStackScreen() {
  return (
    <SpellsStack.Navigator>
      <SpellsStack.Screen
        name={Routes.spells}
        component={SpellsScreen}
        options={{
          title: localization.spells_route_title,
          headerTintColor: theme.colors.primary,
          headerRight: () => (Platform.OS === 'ios' ? <AddButton /> : null),
        }}
      />
      <SpellsStack.Screen
        name={Routes.addSpell}
        component={EditSpellScreen}
        options={{
          title: localization.add_spell_route_title,
          headerTintColor: theme.colors.primary,
        }}
      />
      <SpellsStack.Screen
        name={Routes.chooseYantras}
        component={ChooseYantrasScreen}
        options={{
          title: localization.choose_yantras_route_title,
          headerTintColor: theme.colors.primary,
        }}
      />
    </SpellsStack.Navigator>
  );
}
