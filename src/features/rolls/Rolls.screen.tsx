import React from 'react';
import {View, Button, Text} from 'react-native';
import {style} from './Rolls.styles';
import {RollsProps} from './Rolls.props';

export class RollsScreen extends React.PureComponent<RollsProps> {
  render() {
    return (
      <View style={style.container}>
        <Text>Rolls Screen</Text>
        <Button title="Add a roll" onPress={() => this.props.addRoll()} />
      </View>
    );
  }
}
