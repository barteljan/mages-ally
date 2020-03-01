import React from 'react';
import Picker from 'react-native-picker-select';
import {NumberSwitchProps} from './NumberSwitch.props';
import {
  NumberSwitchStyles,
  makeNumberSwitchStyles,
} from './NumberSwitch.styles';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {withTheme} from 'react-native-paper';

class _NumberSwitch extends DynamiclyStyledPureComponent<
  NumberSwitchProps,
  NumberSwitchStyles
> {
  makeStyle() {
    return makeNumberSwitchStyles(this.props.theme);
  }
  onChangedTo = (type: number) => {
    this.props.onChangedTo(this.props.identifier, type, this.props.parent);
  };
  render() {
    let items: {
      label: string;
      value: number;
    }[] = [];
    for (let i = this.props.minValue; i <= this.props.maxValue; i++) {
      if (i !== 1) {
        items.push({label: i + ' ' + this.props.pluralItemLabel, value: i});
      } else {
        items.push({label: i + ' ' + this.props.singularItemLabel, value: i});
      }
    }
    return (
      <Picker
        items={items}
        value={this.props.selected}
        onValueChange={value => this.onChangedTo(value)}
        style={{
          inputIOS: this.state.styles.inputIOS,
          viewContainer: this.state.styles.viewContainer,
        }}
      />
    );
  }
}

export const NumberSwitch = withTheme(_NumberSwitch);
