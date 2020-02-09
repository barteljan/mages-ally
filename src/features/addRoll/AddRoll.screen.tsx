import React from 'react';
import {AddRollProps} from './AddRollProps';
import {Text, View} from 'react-native';
import {style} from './AddRoll.style';

export class AddRollScreen extends React.PureComponent<AddRollProps> {
  render() {
    return (
      <View style={style.container}>
        <Text>AddRollScreen</Text>
      </View>
    );
  }
}
