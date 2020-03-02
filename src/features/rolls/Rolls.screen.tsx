import React, {Ref} from 'react';
import {View, Platform, Text, LayoutAnimation, UIManager} from 'react-native';
import {RollsStyle, makeRollsStyle} from './Rolls.styles';
import {RollsProps} from './Rolls.props';
import RollsAddButton from './add-button/RollsAddButton.container';
import {FlatList} from 'react-native';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {DynamiclyStyledPureComponent} from '../../components/DynamiclyStyledPureComponent';
import {withTheme} from 'react-native-paper';
import {RollItem} from './list-item/RollItem';
import {DiceRollConfig} from 'src/rules/dice-roll/DiceRoll.config';

class _RollsScreen extends DynamiclyStyledPureComponent<
  RollsProps,
  RollsStyle
> {
  flatList: Ref<FlatList<DiceRoll>> | undefined;

  constructor(props: RollsProps) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  makeStyle() {
    return makeRollsStyle(this.props.theme);
  }

  onReroll = (config: DiceRollConfig) => {
    this.props.onReroll(config);
    if (this.flatList) {
      //@ts-ignore
      this.flatList.scrollToOffset({animated: true, offset: 0});
    }
  };

  itemSelected = (item: DiceRoll) => {
    this.props.itemSelected(item);
  };

  renderItem = (item: {item: DiceRoll}) => {
    const entry: DiceRoll = item.item as DiceRoll;
    return (
      <RollItem
        item={entry}
        onAction={this.onReroll}
        onPress={this.itemSelected}
      />
    );
  };

  componentDidUpdate(prevProps: RollsProps) {
    super.componentDidUpdate(prevProps);
    if (prevProps.rolls.length !== this.props.rolls.length) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }

  flatListRef = (ref: any) => (this.flatList = ref);

  render() {
    const button =
      Platform.OS === 'android' ? (
        <RollsAddButton theme={this.props.theme} />
      ) : null;
    return (
      <View style={this.state.styles.container}>
        <FlatList<DiceRoll>
          ref={this.flatListRef}
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
