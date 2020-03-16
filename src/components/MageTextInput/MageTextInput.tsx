import React, {PureComponent} from 'react';
import {TextInput, Surface, withTheme} from 'react-native-paper';
import {MageTextInputProps} from './MageTextInput.props';
import {MageTextInputState} from './MageTextInput.state';
import {
  MageTextInputStyles,
  makeMageTextInputStyles,
} from './MageTextInput.styles';
import {isEqual} from 'lodash';

class _MageTextInput extends PureComponent<
  MageTextInputProps,
  MageTextInputState
> {
  state = {
    styles: this.makeStyle(),
    text: this.props.value,
  };

  makeStyle(): MageTextInputStyles {
    return makeMageTextInputStyles(this.props.theme);
  }

  componentDidUpdate = (prevProps: MageTextInputProps) => {
    if (
      (!this.state && this.props.value) ||
      prevProps.value !== this.props.value
    ) {
      this.setState({text: this.props.value});
    }

    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      //@ts-ignore
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles: styles});
    }
  };

  onBlur = () => {
    if (!this.state) {
      return;
    }
    this.props.onBlur(
      this.props.identifier,
      this.state.text && this.state.text.length > 0
        ? this.state.text
        : undefined,
      this.props.parent,
    );
  };

  onChange = (text: string) => {
    this.setState({text}, () => {
      if (this.props.onChangeText) {
        this.props.onChangeText(
          this.props.identifier,
          this.state.text,
          this.props.parent,
        );
      }
    });
  };

  render = () => {
    return (
      <Surface style={this.state.styles.container}>
        <TextInput
          style={[this.state.styles.inputField, this.props.style]}
          label={this.props.label}
          value={this.state ? this.state.text : this.props.value}
          onChangeText={this.onChange}
          onBlur={this.onBlur}
          mode={'outlined'}
        />
      </Surface>
    );
  };
}

export const MageTextInput = withTheme(_MageTextInput);
