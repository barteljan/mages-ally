import React from 'react';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {BaseFormRowItem, FormRowType, BaseRowProps} from './Form';
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';
import {InputContainer} from '../InputContainer/InputContainer';
import Picker, {Item} from 'react-native-picker-select';

export type TextPickerRowItem = BaseFormRowItem<string> & {
  type: FormRowType.textPicker;
  options: {value: string; label: string}[];
};

export const makeTextPickerRowItem = (
  identifier: string,
  options: {value: string; label: string}[],
  partial: Partial<TextPickerRowItem>,
): TextPickerRowItem => {
  return {
    identifier,
    label: '',
    parent: 'no_parent',
    type: FormRowType.textPicker,
    value: undefined,
    options,
    ...partial,
  };
};

export type TextPickerRowProps = BaseRowProps<string> & {
  item: TextPickerRowItem;
};

export type TextPickerRowStyle = {
  rowStyle: ViewStyle;
  viewContainer: ViewStyle;
  inputIOS: TextStyle;
};

export const makeTextPickerRowStyle = (theme: Theme) =>
  StyleSheet.create<TextPickerRowStyle>({
    rowStyle: {},
    viewContainer: {
      justifyContent: 'center',
      paddingHorizontal: 15,
      height: '100%',
      width: '100%',
      borderRadius: theme.roundness,
    },
    inputIOS: {
      color: theme.colors.text,
    },
  });

export class TextPickerRow extends DynamiclyStyledPureComponent<
  TextPickerRowProps,
  TextPickerRowStyle
> {
  makeStyle() {
    return makeTextPickerRowStyle(this.props.theme);
  }

  onChange = (value: any) =>
    this.props.onChangeValue(
      this.props.item.identifier,
      value as string,
      this.props.item.parent,
    );

  render = () => (
    <InputContainer
      title={this.props.item.label}
      containerStyle={[
        this.state.styles.rowStyle,
        this.props.rowStyle,
        this.props.item.rowStyle,
      ]}>
      <Picker
        items={(this.props.item.options as unknown) as Item[]}
        value={this.props.item.value}
        onValueChange={this.onChange}
        style={{
          inputIOS: this.state.styles.inputIOS,
          viewContainer: this.state.styles.viewContainer,
        }}
      />
    </InputContainer>
  );
}
