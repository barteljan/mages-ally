import React, {PureComponent} from 'react';
import Picker from 'react-native-picker-select';
import {NumberSwitchProps} from './NumberSwitch.props';
import {styles} from './NumberSwitch.styles';

export class NumberSwitch extends PureComponent<NumberSwitchProps> {
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
          viewContainer: styles.viewContainer,
        }}
      />
    );
  }
}
