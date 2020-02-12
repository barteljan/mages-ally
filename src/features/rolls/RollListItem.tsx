import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {Colors} from '../../layout/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DiceRollOutcome} from '../../rules/dice-roll/DiceRoll.outcome';

import {FontSize} from '../../layout/Font';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';

export interface RollListItemProps {
  item: DiceRoll;
  onReroll: (item: DiceRollConfig) => void;
}

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
        rightSubtitle += 'Exceptional\nSuccess';
        break;
      case DiceRollOutcome.dramaticFailure:
        rightSubtitle += 'Dramatic\nFailure';
        break;
      case DiceRollOutcome.failure:
        rightSubtitle += 'Failure';
        break;
      case DiceRollOutcome.success:
        rightSubtitle += 'Success';
    }

    let subtitle = '';
    if (item.configuration.explodeFor.includes(8)) {
      subtitle += '8 again';
    } else if (item.configuration.explodeFor.includes(9)) {
      subtitle += '9 again';
    } else if (item.configuration.explodeFor.includes(10)) {
      subtitle += '10 again';
    } else {
      subtitle += 'rote quality';
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

class SkullListIcon extends React.PureComponent<{item: DiceRoll}> {
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

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopColor: Colors.seperator,
    borderTopWidth: 1,
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
  },
  skullItem: {
    backgroundColor: Colors.complementColor,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  subtitle: {
    marginTop: 5,
    fontSize: FontSize.small,
  },
  rightSubtitle: {
    fontSize: FontSize.small,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    textAlignVertical: 'top',
    textAlign: 'left',
    flex: 1,
    width: 72,
  },
  success: {
    color: Colors.accentColor,
  },
  failure: {
    color: Colors.complementColor,
  },
});
