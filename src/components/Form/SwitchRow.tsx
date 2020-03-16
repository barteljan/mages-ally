import React from 'react';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {BaseFormRowItem, FormRowType, BaseRowProps} from './Form';
import {StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';
import {MageSwitch} from '../MageSwitch/MageSwitch';

export type SwitchRowItem = BaseFormRowItem<boolean> & {
  type: FormRowType.switch;
};

export const makeSwitchRowItem = (
  identifier: string,
  partial: Partial<SwitchRowItem>,
): SwitchRowItem => {
  return {
    identifier,
    label: '',
    parent: 'no_parent',
    type: FormRowType.switch,
    value: false,
    ...partial,
  };
};

export type SwitchRowProps = BaseRowProps<boolean> & {
  item: SwitchRowItem;
};
export type SwitchRowStyle = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const makeSwitchRowStyle = (theme: Theme) =>
  StyleSheet.create<SwitchRowStyle>({});

export class SwitchRow extends DynamiclyStyledPureComponent<
  SwitchRowProps,
  SwitchRowStyle
> {
  makeStyle() {
    return makeSwitchRowStyle(this.props.theme);
  }

  render = () => (
    <MageSwitch
      parent={this.props.item.parent}
      containerStyle={[this.props.rowStyle, this.props.item.rowStyle]}
      identifier={this.props.item.identifier}
      value={this.props.item.value ? this.props.item.value : false}
      label={this.props.item.label}
      onValueChanged={this.props.onChangeValue}
    />
  );
}
