import React from 'react';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {BaseFormRowItem, FormRowType, BaseRowProps} from './Form';
import {StyleSheet, ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';
import {InputContainer} from '../InputContainer/InputContainer';
import {ButtonGroup} from 'react-native-elements';

export type NumberOptionsRowItem = BaseFormRowItem<number> & {
  type: FormRowType.numberOptions;
  ids: string[];
  buttonTitles: string[];
};

export type NumberOptionsRowProps = BaseRowProps<number> & {
  item: NumberOptionsRowItem;
};

export type NumberOptionsRowStyle = {selectedButton: ViewStyle};

export const makeNumberOptionsRowStyle = (theme: Theme) =>
  StyleSheet.create<NumberOptionsRowStyle>({
    selectedButton: {
      backgroundColor: theme.colors.primary,
    },
  });

export class NumberOptionsRow extends DynamiclyStyledPureComponent<
  NumberOptionsRowProps,
  NumberOptionsRowStyle
> {
  makeStyle = () => makeNumberOptionsRowStyle(this.props.theme);

  index = (index: number | undefined): number => {
    if (index === undefined) {
      return 0;
    }
    for (let i = 0; i < this.props.item.ids.length; i++) {
      if (this.props.item.ids[i] === index + '') {
        return i;
      }
    }
    return 0;
  };

  onChange = (index: number) =>
    this.props.onChangeValue(
      this.props.item.identifier,
      parseInt(this.props.item.ids[index], 10),
      this.props.item.parent,
    );

  render = () => (
    <InputContainer
      title={this.props.item.label}
      containerStyle={[this.props.rowStyle, this.props.item.rowStyle]}>
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
