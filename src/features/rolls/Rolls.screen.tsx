import React, {Ref} from 'react';
import {View, Platform, Text, LayoutAnimation, UIManager} from 'react-native';
import {RollsStyle, makeRollsStyle} from './Rolls.styles';
import {RollsProps} from './Rolls.props';
import RollsAddButton from './add-button/RollsAddButton.container';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {DynamiclyStyledPureComponent} from '../../components/DynamiclyStyledPureComponent';
import {withTheme} from 'react-native-paper';
import {RollItem} from './list-item/RollItem';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';
import {SwipeListView} from 'react-native-swipe-list-view';
import {DeleteItem} from '../../components/DeleteItem/DeleteItem';

class _RollsScreen extends DynamiclyStyledPureComponent<
  RollsProps,
  RollsStyle
> {
  flatList: Ref<SwipeListView<DiceRoll>> | undefined;

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
  };

  itemSelected = (item: DiceRoll) => {
    this.props.itemSelected(item);
  };

  renderItem = (data: {item: DiceRoll}) => {
    const item: DiceRoll = data.item as DiceRoll;
    return (
      <RollItem
        item={item}
        onAction={this.onReroll}
        onPress={() => {
          this.itemSelected(item);
        }}
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

  renderHiddenItem = (data: {item: DiceRoll}) => {
    return (
      <DeleteItem
        delete={this.props.delete}
        theme={this.props.theme}
        id={data.item.id}
        containerStyle={this.state.styles.swipeBackground}
      />
    );
  };

  render() {
    const button =
      Platform.OS === 'android' ? (
        <RollsAddButton theme={this.props.theme} />
      ) : null;
    return (
      <View style={this.state.styles.container}>
        <SwipeListView<DiceRoll>
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
          renderHiddenItem={this.renderHiddenItem}
          rightOpenValue={-75}
          disableRightSwipe={true}
          closeOnRowPress={true}
          closeOnRowOpen={true}
        />
        {button}
      </View>
    );
  }
}

export const RollsScreen = withTheme(_RollsScreen);
