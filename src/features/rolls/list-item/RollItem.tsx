import React from 'react';
import {withTheme, Surface} from 'react-native-paper';
import {View, Text} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../components/DynamiclyStyledPureComponent';
import {MultipleDiceView} from '../../../components/MultipleDiceView/MultipleDiceView';
import {RollInformationView} from './RollInformationView/RollInformationView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native';
import {RollItemProps} from './RollItem.props';
import {RollItemStyle, makeRollItemStyle} from './RollItem.style';

class _RollItem extends DynamiclyStyledPureComponent<
  RollItemProps,
  RollItemStyle
> {
  makeStyle() {
    return makeRollItemStyle(this.props.theme);
  }

  onReroll = () => {
    this.props.onAction(this.props.item.configuration);
  };

  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.item);
    }
  };

  render() {
    const roll = this.props.item;

    const subtitle = roll.successes + ' Successes';
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[this.state.styles.wrapper, this.props.wrapperStyle]}
        onPress={this.onPress}>
        <Surface style={this.state.styles.surface}>
          <View style={this.state.styles.container} key={roll.id + '_spell'}>
            <View style={this.state.styles.headerRow}>
              <View style={this.state.styles.titleContainer}>
                <Text style={[this.state.styles.title, this.props.titleStyle]}>
                  {roll.title}
                </Text>
                <Text style={this.state.styles.subTitle}> - {subtitle}</Text>
              </View>
              <TouchableOpacity onPress={this.onReroll}>
                <Icon
                  name={this.props.iconName ? this.props.iconName : 'redo'}
                  size={20}
                  color={this.props.theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
            <MultipleDiceView
              parent={roll.id}
              theme={this.props.theme}
              dices={roll.rolledDice}
              containerStyle={this.state.styles.dices}
              difficulty={roll.configuration.difficulty}
              scaleDice={this.props.scaleDice}
              onPress={this.onPress}
            />
            <RollInformationView
              theme={this.props.theme}
              roll={this.props.item}
            />
          </View>
        </Surface>
      </TouchableOpacity>
    );
  }
}

export const RollItem = withTheme(_RollItem);
