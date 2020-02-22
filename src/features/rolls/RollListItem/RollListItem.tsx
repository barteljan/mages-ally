import React from 'react';
import {ListItem} from 'react-native-elements';
import {DiceRollOutcome} from '../../../rules/dice-roll/DiceRoll.outcome';
import {RollsItemStyle, makeRollsItemStyle} from './RollListItem.style';
import {RollListItemProps} from './RollListItem.props';
import {View, ViewStyle} from 'react-native';
import {DiceRoll} from '../../../rules/dice-roll/DiceRoll';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {localization} from './RollListItem.strings';
import {DynamiclyStyledPureComponent} from '../../../components/DynamiclyStyledPureComponent';
import {withTheme} from 'react-native-paper';

class _RollListItem extends DynamiclyStyledPureComponent<
  RollListItemProps,
  RollsItemStyle
> {
  makeStyle() {
    return makeRollsItemStyle(this.props.theme);
  }

  render() {
    const {item} = this.props;

    let avatar: any;

    if (item.outcome === DiceRollOutcome.dramaticFailure) {
      avatar = (
        <SkullListIcon
          style={this.state.styles.skullItem}
          item={item}
          iconColor={this.props.theme.colors.surface}
        />
      );
    } else {
      avatar = {
        title: item.successes + '',
        overlayContainerStyle: {
          backgroundColor:
            item.successes > 0
              ? this.props.theme.colors.accent
              : this.props.theme.colors.error,
        },
      };
    }

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

    return (
      <ListItem
        key={item.id}
        title={item.title}
        leftAvatar={avatar}
        subtitle={subtitle}
        subtitleStyle={this.state.styles.subtitle}
        rightIcon={{
          name: 'cached',
          color: this.props.theme.colors.disabled,
          onPress: () => this.props.onReroll(item.configuration),
          size: 28,
        }}
        rightSubtitle={rightSubtitle}
        rightSubtitleStyle={[
          this.state.styles.rightSubtitle,
          item.successes > 0
            ? this.state.styles.success
            : this.state.styles.failure,
        ]}
        bottomDivider
      />
    );
  }
}

export class SkullListIcon extends React.PureComponent<{
  item: DiceRoll;
  style: ViewStyle;
  iconColor: string;
}> {
  render() {
    return (
      <View style={this.props.style}>
        <Icon name="skull-crossbones" size={24} color={this.props.iconColor} />
      </View>
    );
  }
}

export const RollListItem = withTheme(_RollListItem);
