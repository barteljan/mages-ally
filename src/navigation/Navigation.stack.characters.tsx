import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import {localization} from './Navigation.strings';
import AddButton from '../features/spells/add-button/SpellsAddButton.container';
import {Platform} from 'react-native';
import {theme} from '../layout/Theme';
import {CharactersScreen} from '../features/characters/Characters.screen';
import {CharacterEditScreen} from '../features/characters/edit/CharacterEdit.screen';

const SpellsStack = createStackNavigator();

export function CharactersStackScreen() {
  return (
    <SpellsStack.Navigator>
      <SpellsStack.Screen
        name={Routes.characters}
        component={CharactersScreen}
        options={{
          title: localization.characters_route_title,
          headerTintColor: theme.colors.primary,
          headerRight: () => (Platform.OS === 'ios' ? <AddButton /> : null),
        }}
      />
      <SpellsStack.Screen
        name={Routes.editCharacter}
        component={CharacterEditScreen}
        options={{
          title: localization.edit_character_route_title,
          headerTintColor: theme.colors.primary,
        }}
      />
    </SpellsStack.Navigator>
  );
}
