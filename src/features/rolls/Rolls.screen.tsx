import React from 'react';
import {View, Platform, Text} from 'react-native';
import {RollsStyle, makeRollsStyle} from './Rolls.styles';
import {RollsProps} from './Rolls.props';
import RollsAddButton from './add-button/RollsAddButton.container';
import {FlatList} from 'react-native-gesture-handler';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {RollListItem} from './list-item/RollListItem';
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
          contentContainerStyle={this.state.styles.contentContainerStyle}
          ListEmptyComponent={
            <View style={this.state.styles.emptyComponentContainer}>
              <Text>No rolls found!</Text>
            </View>
          }
        />
        {button}
      </View>
    );
  }
}

export const RollsScreen = withTheme(_RollsScreen);
