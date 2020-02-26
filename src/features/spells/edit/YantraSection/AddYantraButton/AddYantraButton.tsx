import React, {PureComponent} from 'react';
import {localization} from '../../EditSpell.strings';
import {Text} from 'react-native';
import {InputContainer} from '../../../../../components/InputContainer/InputContainer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AddYantraButtonProps} from './AddYantraButton.props';
import {
  AddYantraButtonStyle,
  makeAddYantraButtonStyle,
} from './AddYantraButton.style';
import {isEqual} from 'lodash';

export type AddYantraButtonState = {
  showOverlay: boolean;
  listHeight: number;
  styles: AddYantraButtonStyle;
};

export class AddYantraButton extends PureComponent<
  AddYantraButtonProps,
  AddYantraButtonState
> {
  state = {
    showOverlay: false,
    listHeight: 0,
    styles: this.makeStyle(),
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(prevProps: AddYantraButtonProps) {
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      //@ts-ignore
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles: styles});
    }
  }

  makeStyle(): AddYantraButtonStyle {
    return makeAddYantraButtonStyle(
      this.props.theme,
      this.props.containerStyle,
    );
  }

  onPress = () => {
    this.props.addYantra(this.props.parent);
  };

  render() {
    return (
      <InputContainer
        title={localization.yantra_add_button_title}
        containerStyle={this.state.styles.containerStyle}
        titleStyle={this.state.styles.containerTitle}>
        <TouchableOpacity
          style={this.state.styles.buttonStyle}
          onPress={this.onPress}>
          <Text style={this.state.styles.buttonText}>
            {localization.yantra_add_button_title}
          </Text>
          <Icon name="plus" size={18} color={this.props.theme.colors.primary} />
        </TouchableOpacity>
      </InputContainer>
    );
  }
}
