import React from 'react';
import {Text} from 'react-native';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {Switch, withTheme, Surface} from 'react-native-paper';
import {makeMageSwitchStyle} from './MageSwitch.style';
import {MageSwitchStyle} from './MageSwitch.style';
import {MageSwitchProps} from './MageSwitch.props';

class _MageSwitch extends DynamiclyStyledPureComponent<
  MageSwitchProps,
  MageSwitchStyle
> {
  makeStyle() {
    return makeMageSwitchStyle(this.props.theme);
  }
  onValueChange = (value: boolean) =>
    this.props.onValueChanged(this.props.identifier, value, this.props.parent);
  render() {
    return (
      <Surface style={[this.state.styles.container, this.props.containerStyle]}>
        <Text style={this.state.styles.label}>{this.props.label}</Text>
        <Switch
          style={this.state.styles.switch}
          value={this.props.value}
          color={this.props.theme.colors.primary}
          onValueChange={this.onValueChange}
        />
      </Surface>
    );
  }
}

export const MageSwitch = withTheme(_MageSwitch);
