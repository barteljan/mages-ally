import React from 'react';
import {ListItem} from 'react-native-elements';
import {DiceRollOutcome} from '../../../rules/dice-roll/DiceRoll.outcome';
import {RollsItemStyle, makeRollsItemStyle} from './RollListItem.style';
import {RollListItemProps} from './RollListItem.props';
import {View, Text} from 'react-native';
import {localization} from './RollListItem.strings';
import {DynamiclyStyledPureComponent} from '../../../components/DynamiclyStyledPureComponent';
import {withTheme} from 'react-native-paper';
import {DiceView} from '../../../components/DiceView/DiceView';

class _RollListItem extends DynamiclyStyledPureComponent<
  RollListItemProps,
  RollsItemStyle
> {
  makeStyle() {
    return makeRollsItemStyle(this.props.theme);
  }

  render() {
    const {item} = this.props;

    let avatar = (
      <DiceView
        index={item.successes}
        diceImageStyle={{
          tintColor:
            item.successes > 0
              ? this.props.theme.colors.primary
              : this.props.theme.colors.error,
        }}
      />
    );

    let rightSubtitle = '';
    switch (item.outcome) {
      case DiceRollOutcome.exceptionalSuccess:
        rightSubtitle += localization.exceptional_success;
        break;
      case DiceRollOutcome.dramaticFailure:
        rightSubtitle += localization.dramatic_failure;
        break;
      case DiceRollOutcome.failure:
        rightSubtitle += localization.failure;
        break;
      case DiceRollOutcome.success:
        rightSubtitle += localization.success;
    }

    let subtitle = '';
    if (item.configuration.explodeFor.includes(8)) {
      subtitle += localization.eightAgain;
    } else if (item.configuration.explodeFor.includes(9)) {
      subtitle += localization.nineAgain;
    } else if (item.configuration.explodeFor.includes(10)) {
      subtitle += localization.tenAgain;
    } else {
      subtitle += localization.roteQuality;
    }

    let titleItem = (
      <View style={this.state.styles.titleContainer}>
        <Text style={this.state.styles.title}>{item.title}</Text>
        <Text style={this.state.styles.subtitle}> - {subtitle}</Text>
      </View>
    );

    return (
      <ListItem
        key={item.id}
        title={titleItem}
        leftAvatar={avatar}
        subtitle={
          <View style={this.state.styles.subtitleWrapper}>
            <Text
              style={[
                this.state.styles.rightSubtitle,
                item.successes > 0
                  ? this.state.styles.success
                  : this.state.styles.failure,
              ]}>
              {rightSubtitle}
            </Text>
          </View>
        }
        rightIcon={{
          name: 'cached',
          color: this.props.theme.colors.disabled,
          onPress: () => this.props.onReroll(item.configuration),
          size: 28,
        }}
        bottomDivider
      />
    );
  }
}

export const RollListItem = withTheme(_RollListItem);
