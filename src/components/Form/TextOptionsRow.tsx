import React from 'react';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {BaseFormRowItem, FormRowType, BaseRowProps} from './Form';
import {StyleSheet, ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';
import {InputContainer} from '../InputContainer/InputContainer';
import {ButtonGroup} from 'react-native-elements';

export type TextOptionsRowItem = BaseFormRowItem<string> & {
  type: FormRowType.textOptions;
  ids: string[];
  buttonTitles: string[];
};

export const makeTextOptionsRowItem = (
  identifier: string,
  ids: string[],
  buttonTitles: string[],
  partial: Partial<TextOptionsRowItem>,
): TextOptionsRowItem => {
  return {
    identifier,
    label: '',
    parent: 'no_parent',
    type: FormRowType.textOptions,
    value: undefined,
    ids,
    buttonTitles,
    ...partial,
  };
};

export type TextOptionsRowProps = BaseRowProps<string> & {
  item: TextOptionsRowItem;
};

export type TextOptionsRowStyle = {
  selectedButton: ViewStyle;
  rowStyle: ViewStyle;
};

export const makeTextOptionsRowStyle = (theme: Theme) =>
  StyleSheet.create<TextOptionsRowStyle>({
    rowStyle: {
      height: 56 * 1.5,
    },
    selectedButton: {
      backgroundColor: theme.colors.primary,
    },
  });

export class TextOptionsRow extends DynamiclyStyledPureComponent<
  TextOptionsRowProps,
  TextOptionsRowStyle
> {
  makeStyle() {
    return makeTextOptionsRowStyle(this.props.theme);
  }

  index = (value: string | undefined): number => {
    if (value === undefined) {
      return 0;
    }
    for (let i = 0; i < this.props.item.ids.length; i++) {
      if (this.props.item.ids[i] === value + '') {
        return i;
      }
    }
    return 0;
  };

  onChange = (index: number) =>
    this.props.onChangeValue(
      this.props.item.identifier,
      this.props.item.ids[index],
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
      <ButtonGroup
        buttons={this.props.item.buttonTitles}
        selectedButtonStyle={this.state.styles.selectedButton}
        selectedIndex={this.index(this.props.item.value)}
        onPress={this.onChange}
        underlayColor={this.props.theme.colors.primary}
      />
    </InputContainer>
  );
}
