import React from 'react';
import {View, Platform} from 'react-native';
import {RollsStyle, makeRollsStyle} from './Rolls.styles';
import {RollsProps} from './Rolls.props';
import RollsAddButton from './RollsAddButton/RollsAddButton.container';
import {FlatList} from 'react-native-gesture-handler';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {RollListItem} from './RollListItem/RollListItem';
import {DynamiclyStyledPureComponent} from '../../components/DynamiclyStyledPureComponent';
import {withTheme} from 'react-native-paper';

class _RollsScreen extends DynamiclyStyledPureComponent<
  RollsProps,
  RollsStyle
> {
  makeStyle() {
    return makeRollsStyle(this.props.theme);
  }

  renderItem = (item: {item: DiceRoll}) => {
    const entry: DiceRoll = item.item as DiceRoll;
    return <RollListItem item={entry} onReroll={this.props.onReroll} />;
  };

  render() {
    const button =
      Platform.OS === 'android' ? (
        <RollsAddButton theme={this.props.theme} />
      ) : null;
    return (
      <View style={this.state.styles.container}>
        <FlatList<DiceRoll>
          style={this.state.styles.list}
          data={this.props.rolls}
          renderItem={this.renderItem}
        />
        {button}
      </View>
    );
  }
}

export const RollsScreen = withTheme(_RollsScreen);
