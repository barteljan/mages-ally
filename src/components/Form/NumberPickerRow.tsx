import React from 'react';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {BaseFormRowItem, FormRowType, BaseRowProps} from './Form';
import {StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';
import {InputContainer} from '../InputContainer/InputContainer';
import {NumberSwitch} from '../NumberSwitch/NumberSwitch';

export type NumberPickerRowItem = BaseFormRowItem<number> & {
  type: FormRowType.numberPicker;
  maxValue: number;
  minValue: number;
  singularItemLabel: string;
  pluralItemLabel: string;
};

export const makeNumberPickerRowItem = (
  identifier: string,
  singularItemLabel: string,
  pluralItemLabel: string,
  partial: Partial<NumberPickerRowItem>,
): NumberPickerRowItem => {
  return {
    identifier,
    label: '',
    parent: 'no_parent',
    type: FormRowType.numberPicker,
    value: 0,
    minValue: 0,
    maxValue: 20,
    singularItemLabel,
    pluralItemLabel,
    ...partial,
  };
};

export type NumberPickerRowProps = BaseRowProps<number> & {
  item: NumberPickerRowItem;
};
export type NumberPickerRowStyle = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const makeNumberPickerRowStyle = (theme: Theme) =>
  StyleSheet.create<NumberPickerRowStyle>({});

export class NumberPickerRow extends DynamiclyStyledPureComponent<
  NumberPickerRowProps,
  NumberPickerRowStyle
> {
  makeStyle() {
    return makeNumberPickerRowStyle(this.props.theme);
  }

  render = () => (
    <InputContainer
      title={this.props.item.label}
      containerStyle={[this.props.rowStyle, this.props.item.rowStyle]}>
      <NumberSwitch
        key={this.props.item.identifier + 'number_select'}
        identifier={this.props.item.identifier}
        parent={this.props.item.parent}
        selected={
          this.props.item.value
            ? this.props.item.value
            : this.props.item.minValue
        }
        onChangedTo={this.props.onChangeValue}
        minValue={0}
        maxValue={this.props.item.maxValue}
        singularItemLabel={this.props.item.singularItemLabel}
        pluralItemLabel={this.props.item.pluralItemLabel}
      />
    </InputContainer>
  );
}
