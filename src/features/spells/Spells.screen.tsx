import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './Spells.styles';

export class SpellsScreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>{'Spells'}</Text>
      </View>
    );
  }
}
