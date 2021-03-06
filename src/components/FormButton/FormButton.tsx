import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import {InputContainer} from '../InputContainer/InputContainer';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FormButtonProps} from './FormButton.props';
import {FormButtonStyle, makeFormButtonStyle} from './FormButton.style';
import {isEqual} from 'lodash';

export type FormButtonState = {
  listHeight: number;
  styles: FormButtonStyle;
};

export class FormButton extends PureComponent<
  FormButtonProps,
  FormButtonState
> {
  state = {
    listHeight: 0,
    styles: this.makeStyle(),
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(prevProps: FormButtonProps) {
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      //@ts-ignore
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles: styles});
    }
  }

  makeStyle(): FormButtonStyle {
    return makeFormButtonStyle(
      this.props.theme,
      this.props.containerStyle,
      this.props.buttonStyle,
      this.props.buttonTextStyle,
    );
  }

  onPress = () => {
    this.props.onPress(this.props.parent);
  };

  render() {
    const iconName = this.props.actionIconName
      ? this.props.actionIconName
      : 'plus';
    const actionComponent = this.props.actionComponent ? (
      this.props.actionComponent
    ) : (
      <Icon name={iconName} size={18} color={this.props.theme.colors.primary} />
    );

    return (
      <InputContainer
        title={this.props.title}
        containerStyle={this.state.styles.containerStyle}
        titleStyle={this.state.styles.containerTitle}>
        <TouchableOpacity
          style={this.state.styles.buttonStyle}
          onPress={this.onPress}>
          <Text style={this.state.styles.buttonText}>{this.props.title}</Text>
          <View style={this.state.styles.iconContainer}>{actionComponent}</View>
        </TouchableOpacity>
      </InputContainer>
    );
  }
}
