import React from 'react';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {BaseFormRowItem, FormRowType, BaseRowProps} from './Form';
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';
import {MageTextInput} from '../MageTextInput/MageTextInput';

export type TextInputRowItem = BaseFormRowItem<string> & {
  type: FormRowType.textInput;
};

export const makeTextInputRowItem = (
  identifier: string,
  partial: Partial<TextInputRowItem>,
): TextInputRowItem => {
  return {
    identifier,
    label: '',
    parent: 'no_parent',
    type: FormRowType.textInput,
    value: undefined,
    ...partial,
  };
};

export type TextInputRowProps = BaseRowProps<string> & {
  item: TextInputRowItem;
};

export type TextInputRowStyle = {
  viewContainer: ViewStyle;
  inputIOS: TextStyle;
};

export const makeTextInputRowStyle = (theme: Theme) =>
  StyleSheet.create<TextInputRowStyle>({
    viewContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 15,
      borderRadius: theme.roundness,
    },
    inputIOS: {
      color: theme.colors.text,
    },
  });

export class TextInputRow extends DynamiclyStyledPureComponent<
  TextInputRowProps,
  TextInputRowStyle
> {
  makeStyle() {
    return makeTextInputRowStyle(this.props.theme);
  }

  onChange = (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => {
    this.props.onChangeValue(identifier, value as string, parent);
  };

  render = () => (
    <MageTextInput
      identifier={this.props.item.identifier}
      parent={this.props.item.parent}
      value={this.props.item.value}
      label={this.props.item.label}
      onChangeText={this.onChange}
      onBlur={this.onChange}
      style={[this.props.rowStyle, this.props.item.rowStyle]}
    />
  );
}
