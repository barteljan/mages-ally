import React, {Fragment} from 'react';
import {withTheme, Surface} from 'react-native-paper';
import {View, TouchableWithoutFeedback, Text} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../components/DynamiclyStyledPureComponent';
import {MultipleDiceView} from '../../../components/MultipleDiceView/MultipleDiceView';
import {RollInformationView} from './RollInformationView/RollInformationView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
    this.props.onReroll(this.props.item.configuration);
  };

  render() {
    const roll = this.props.item;

    const subtitle = roll.successes + ' Successes';

    return (
      <View style={this.state.styles.wrapper}>
        <Surface style={this.state.styles.surface}>
          <TouchableWithoutFeedback
            style={this.state.styles.container}
            key={roll.id + '_spell'}>
            <Fragment>
              <View style={this.state.styles.headerRow}>
                <View style={this.state.styles.titleContainer}>
                  <Text style={this.state.styles.title}>{roll.title}</Text>
                  <Text style={this.state.styles.subTitle}> - {subtitle}</Text>
                </View>
                <TouchableOpacity onPress={this.onReroll}>
                  <Icon
                    name="redo"
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
              />
              <RollInformationView
                theme={this.props.theme}
                roll={this.props.item}
              />
            </Fragment>
          </TouchableWithoutFeedback>
        </Surface>
      </View>
    );
  }
}

export const RollItem = withTheme(_RollItem);
