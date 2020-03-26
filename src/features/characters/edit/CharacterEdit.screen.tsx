import React from 'react';
import {View} from 'react-native';
import {Theme, withTheme} from 'react-native-paper';

export type CharacterEditScreenProps = {theme: Theme};
export type CharacterEditScreenStyles = {};

export const makeCharacterEditScreenStyles = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme: Theme,
): CharacterEditScreenStyles => {
  return {};
};

export type CharacterEidtScreenState = {
  styles: CharacterEditScreenStyles;
};

class _CharactersEditScreen extends React.PureComponent<
  CharacterEditScreenProps,
  CharacterEidtScreenState
> {
  makeStyle() {
    return makeCharacterEditScreenStyles(this.props.theme);
  }

  render() {
    return <View />;
  }
}

export const CharacterEditScreen = withTheme(_CharactersEditScreen);
