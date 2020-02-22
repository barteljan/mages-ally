import React, {PureComponent} from 'react';
import {TextInput} from 'react-native-paper';
import {MageTextInputProps} from './MageTextInput.props';
import {MageTextInputState} from './MageTextInput.state';

export class MageTextInput extends PureComponent<
  MageTextInputProps,
  MageTextInputState
> {
  componentDidUpdate = (prevProps: MageTextInputProps) => {
    if (
      (!this.state && this.props.value) ||
      prevProps.value !== this.props.value
    ) {
      this.setState({text: this.props.value});
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

  onChange = (text: string) => this.setState({text});

  render = () => {
    return (
      <TextInput
        style={this.props.style}
        label={this.props.label}
        value={this.state ? this.state.text : this.props.value}
        onChangeText={this.onChange}
        onBlur={this.onBlur}
        mode={'outlined'}
      />
    );
  };
}
