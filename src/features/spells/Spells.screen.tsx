import React from 'react';
import {Text, View, Platform} from 'react-native';
import {styles} from './Spells.styles';
import SpellsAddButton from '../spells-add-button/SpellsAddButton.container';

export class SpellsScreen extends React.PureComponent {
  render() {
    const button = Platform.OS === 'android' ? <SpellsAddButton /> : null;

    return (
      <View style={styles.container}>
        <Text>{'Spells'}</Text>
        {button}
      </View>
    );
  }
}
