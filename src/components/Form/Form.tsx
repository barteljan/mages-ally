import React from 'react';
import {ViewStyle, StyleSheet, View, StyleProp} from 'react-native';
import {PureComponent} from 'react';
import {Theme} from 'react-native-paper';
import {isEqual} from 'lodash';
import {DotsRowItem, DotSelectRow} from './DotSelectRow';
import {NumberOptionsRowItem, NumberOptionsRow} from './NumberOptionsRow';
import {NumberPickerRow, NumberPickerRowItem} from './NumberPickerRow';
import {TextPickerRow, TextPickerRowItem} from './TextPickerRow';
import {TextOptionsRow, TextOptionsRowItem} from './TextOptionsRow';
import {SwitchRow, SwitchRowItem} from './SwitchRow';
import {TextInputRowItem, TextInputRow} from './TextInputRow';

export enum FormRowType {
  textInput = 'textInput',
  dots = 'dots',
  switch = 'switch',
  textPicker = 'textSelect',
  numberPicker = 'numberSelect',
  numberOptions = 'numberOptions',
  textOptions = 'textOptions',
}

export type BaseFormRowItem<ValueType> = {
  identifier: string;
  parent: string;
  label: string;
  value: ValueType | undefined;
  type: FormRowType;
  rowStyle?: ViewStyle;
};

export type FormRowItem =
  | TextInputRowItem
  | DotsRowItem
  | TextPickerRowItem
  | NumberPickerRowItem
  | SwitchRowItem
  | TextOptionsRowItem
  | NumberOptionsRowItem;

export type BaseRowProps<ValueType> = {
  theme: Theme;
  rowStyle?: StyleProp<ViewStyle>;
  onChangeValue: (
    identifier: string,
    value: ValueType | undefined,
    parent: string,
  ) => void;
};

export const rowComponentForRowItem = (
  formIdentifier: string,
  item: FormRowItem,
  theme: Theme,
  onChangeString: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void,
  onChangeNumber: (
    identifier: string,
    value: number | undefined,
    parent: string,
  ) => void,
  onChangeBoolean: (
    identifier: string,
    value: boolean | undefined,
    parent: string,
  ) => void,
  rowStyle?: StyleProp<ViewStyle>,
): Element => {
  switch (item.type) {
    case FormRowType.dots:
      return (
        <DotSelectRow
          key={formIdentifier + '_' + item.identifier}
          theme={theme}
          item={item}
          rowStyle={rowStyle}
          onChangeValue={onChangeNumber}
        />
      );
    case FormRowType.numberOptions:
      return (
        <NumberOptionsRow
          key={formIdentifier + '_' + item.identifier}
          theme={theme}
          item={item}
          rowStyle={rowStyle}
          onChangeValue={onChangeNumber}
        />
      );
    case FormRowType.numberPicker:
      return (
        <NumberPickerRow
          key={formIdentifier + '_' + item.identifier}
          theme={theme}
          item={item}
          rowStyle={rowStyle}
          onChangeValue={onChangeNumber}
        />
      );
    case FormRowType.switch:
      return (
        <SwitchRow
          key={formIdentifier + '_' + item.identifier}
          theme={theme}
          item={item}
          rowStyle={rowStyle}
          onChangeValue={onChangeBoolean}
        />
      );
    case FormRowType.textInput:
      return (
        <TextInputRow
          key={formIdentifier + '_' + item.identifier}
          theme={theme}
          item={item}
          rowStyle={rowStyle}
          onChangeValue={onChangeString}
        />
      );
    case FormRowType.textOptions:
      return (
        <TextOptionsRow
          key={formIdentifier + '_' + item.identifier}
          theme={theme}
          item={item}
          rowStyle={rowStyle}
          onChangeValue={onChangeString}
        />
      );
    case FormRowType.textPicker:
      return (
        <TextPickerRow
          key={formIdentifier + '_' + item.identifier}
          theme={theme}
          item={item}
          rowStyle={rowStyle}
          onChangeValue={onChangeString}
        />
      );
  }
};

export type FormProps = {
  identifier: string;
  rows: FormRowItem[];
  theme: Theme;
  onChangeString?: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;
  onChangeNumber?: (
    identifier: string,
    value: number | undefined,
    parent: string,
  ) => void;
  onChangeBoolean?: (
    identifier: string,
    value: boolean | undefined,
    parent: string,
  ) => void;
  containerStyle?: ViewStyle;
  rowStyle?: ViewStyle;
};

export type FormStyle = {rowStyle: ViewStyle};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const makeFormStyle = (theme: Theme) =>
  StyleSheet.create<FormStyle>({rowStyle: {marginBottom: 20}});

export type FormState = {
  styles: FormStyle;
};

export class Form extends PureComponent<FormProps, FormState> {
  makeStyles = () => makeFormStyle(this.props.theme);

  state = {
    styles: this.makeStyles(),
  };

  onChangeString = (
    identifier: string,
    value: string | undefined,
    parent: string,
  ): void => {
    if (this.props.onChangeString) {
      this.props.onChangeString(identifier, value, parent);
    }
  };

  onChangeNumber = (
    identifier: string,
    value: number | undefined,
    parent: string,
  ): void => {
    if (this.props.onChangeNumber) {
      this.props.onChangeNumber(identifier, value, parent);
    }
  };

  onChangeBoolean = (
    identifier: string,
    value: boolean | undefined,
    parent: string,
  ): void => {
    if (this.props.onChangeBoolean) {
      this.props.onChangeBoolean(identifier, value, parent);
    }
  };

  componentDidUpdate() {
    const styles = this.makeStyles();
    if (!isEqual(styles, this.state.styles)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles});
    }
  }

  render = () => {
    const rows: Element[] = [];

    this.props.rows.forEach(row => {
      rows.push(
        rowComponentForRowItem(
          this.props.identifier,
          row,
          this.props.theme,
          this.onChangeString,
          this.onChangeNumber,
          this.onChangeBoolean,
          [this.state.styles.rowStyle, this.props.rowStyle],
        ),
      );
    });

    return <View style={this.props.containerStyle}>{rows}</View>;
  };
}
