import React from 'react';
import {View} from 'react-native';
import {withTheme} from 'react-native-paper';
import {CharactersScreenProps} from './Characters.props';
import {
  makeCharactersScreenStyles,
  CharactersScreenStyles,
} from './Characters.styles';

export type CharactersScreenState = {
  styles: CharactersScreenStyles;
};

class _CharactersScreen extends React.PureComponent<
  CharactersScreenProps,
  CharactersScreenState
> {
  makeStyle() {
    return makeCharactersScreenStyles(this.props.theme);
  }

  render() {
    return <View />;
  }
}

export const CharactersScreen = withTheme(_CharactersScreen);
