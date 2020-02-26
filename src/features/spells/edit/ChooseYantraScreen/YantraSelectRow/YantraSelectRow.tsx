import React from 'react';
import {Text, View} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../../../components/DynamiclyStyledPureComponent';
import {DotSelect} from '../../../../../components/DotSelect/DotSelect';
import {yantraLabel} from '../../../../../rules/spells/yantra/Yantra.strings';
import {makeYantraSelectRowStyle} from './YantraSelectRowStyle';
import {YantraSelectRowProps} from './YantraSelectRowProps';
import {YantraSelectRowStyle} from './YantraSelectRowStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

export class YantraSelectRow extends DynamiclyStyledPureComponent<
  YantraSelectRowProps,
  YantraSelectRowStyle
> {
  makeStyle(): YantraSelectRowStyle {
    return makeYantraSelectRowStyle(this.props.theme);
  }

  onPress = () => {
    this.props.didSelectYantra(this.props.yantra);
  };

  render() {
    const yantra = this.props.yantra;
    const theme = this.props.theme;
    let title = yantra.name;
    if (!title) {
      title = yantraLabel(yantra.id);
    }
    return (
      <View style={this.state.styles.yantraContainer}>
        <TouchableOpacity
          style={this.state.styles.itemContainer}
          onPress={this.onPress}>
          <View style={this.state.styles.titleRow}>
            <Text style={this.state.styles.title}>{title}</Text>
            <DotSelect
              parent={''}
              numberOfDots={yantra.fixedDice ? yantra.maxDice : 0}
              identifier={yantra.id}
              value={yantra.diceModifier}
              dotSize={18}
              color={
                yantra.fixedDice === false
                  ? theme.colors.onBackground
                  : theme.colors.disabled
              }
            />
          </View>
          <Text style={this.state.styles.description}>
            {yantra.description}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
