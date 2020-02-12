import React from 'react';
import {ListItem} from 'react-native-elements';
import {Colors} from '../../../layout/Colors';
import {DiceRollOutcome} from '../../../rules/dice-roll/DiceRoll.outcome';
import {style} from './RollListItem.style';
import {RollListItemProps} from './RollListItem.props';
import {View} from 'react-native';
import {DiceRoll} from '../../../rules/dice-roll/DiceRoll';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {localization} from './RollListItem.strings';

export class RollListItem extends React.PureComponent<RollListItemProps> {
  render() {
    const {item} = this.props;

    let avatar: any;

    if (item.outcome === DiceRollOutcome.dramaticFailure) {
      avatar = <SkullListIcon item={item} />;
    } else {
      avatar = {
        title: item.successes + '',
        overlayContainerStyle: {
          backgroundColor:
            item.successes > 0 ? Colors.accentColor : Colors.complementColor,
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
        subtitleStyle={style.subtitle}
        rightIcon={{
          name: 'cached',
          color: Colors.disabled,
          onPress: () => this.props.onReroll(item.configuration),
          size: 28,
        }}
        rightSubtitle={rightSubtitle}
        rightSubtitleStyle={[
          style.rightSubtitle,
          item.successes > 0 ? style.success : style.failure,
        ]}
        bottomDivider
      />
    );
  }
}

export class SkullListIcon extends React.PureComponent<{
  item: DiceRoll;
}> {
  render() {
    return (
      <View style={style.skullItem}>
        <Icon
          name="skull-crossbones"
          size={24}
          color={Colors.textOnAccentColor}
        />
      </View>
    );
  }
}
