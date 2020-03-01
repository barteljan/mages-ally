import React from 'react';
import {DynamiclyStyledPureComponent} from '../../../../../components/DynamiclyStyledPureComponent';
import {Surface} from 'react-native-paper';
import {Text, View} from 'react-native';
import {
  ChooseYantraGroupHeaderStyle,
  makeChooseYantraGroupHeaderStyle,
} from './ChooseYantraGroupHeader.style';
import {ChooseYantraGroupHeaderProps} from './ChooseYantraGroupHeader.props';

export class ChooseYantraGroupHeader extends DynamiclyStyledPureComponent<
  ChooseYantraGroupHeaderProps,
  ChooseYantraGroupHeaderStyle
> {
  makeStyle() {
    return makeChooseYantraGroupHeaderStyle(this.props.theme);
  }

  render() {
    return (
      <View style={this.state.styles.container}>
        <Surface style={this.state.styles.contentContainer}>
          <Text style={this.state.styles.label}>{this.props.title}</Text>
        </Surface>
      </View>
    );
  }
}
