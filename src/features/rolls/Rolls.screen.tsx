import React from 'react';
import {View, Platform} from 'react-native';
import {style} from './Rolls.styles';
import {RollsProps} from './Rolls.props';
import ActionButton from '../actionButton/ActionButton.container';
import {FlatList} from 'react-native-gesture-handler';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {RollListItem} from './RollListItem';

export class RollsScreen extends React.PureComponent<RollsProps> {
  renderItem = (item: {item: DiceRoll}) => {
    const entry: DiceRoll = item.item as DiceRoll;
    return <RollListItem item={entry} onReroll={this.props.onReroll} />;
  };

  render() {
    const button = Platform.OS === 'android' ? <ActionButton /> : null;
    return (
      <View style={style.container}>
        <FlatList<DiceRoll>
          style={style.list}
          data={this.props.rolls}
          renderItem={this.renderItem}
        />
        {button}
      </View>
    );
  }
}
