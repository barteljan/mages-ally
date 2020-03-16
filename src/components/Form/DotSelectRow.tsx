import React from 'react';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {BaseFormRowItem, FormRowType, BaseRowProps} from './Form';
import {StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';
import {InputContainer} from '../InputContainer/InputContainer';
import {DotSelect} from '../DotSelect/DotSelect';

export type DotsRowItem = BaseFormRowItem<number> & {
  type: FormRowType.dots;
  maxValue: number;
};

export const makeDotsRowItem = (
  identifier: string,
  partial: Partial<DotsRowItem>,
): DotsRowItem => {
  return {
    identifier,
    label: '',
    parent: 'no_parent',
    type: FormRowType.dots,
    value: 0,
    maxValue: 10,
    ...partial,
  };
};

export type DotSelectRowProps = BaseRowProps<number> & {
  item: DotsRowItem;
};

export type DotSelectRowStyle = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const makeDotSelectRowStyle = (theme: Theme) =>
  StyleSheet.create<DotSelectRowStyle>({});

export class DotSelectRow extends DynamiclyStyledPureComponent<
  DotSelectRowProps,
  DotSelectRowStyle
> {
  makeStyle() {
    return makeDotSelectRowStyle(this.props.theme);
  }

  render = () => (
    <InputContainer
      title={this.props.item.label}
      containerStyle={[this.props.rowStyle, this.props.item.rowStyle]}>
      <DotSelect
        key={this.props.item.identifier + this.props.item.type}
        parent={this.props.item.parent}
        value={this.props.item.value ? this.props.item.value : 0}
        identifier={this.props.item.identifier}
        didSelect={this.props.onChangeValue}
        numberOfDots={this.props.item.maxValue}
      />
    </InputContainer>
  );
}
