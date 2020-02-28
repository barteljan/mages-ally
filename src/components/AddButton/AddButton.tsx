import React from 'react';
import {AddButtonProps} from './AddButton.props';
import {Platform, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AddButtonStyle, makeAddButtonStyle} from './AddButton.style';
import {FAB, withTheme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';

class _AddButton extends DynamiclyStyledPureComponent<
  AddButtonProps,
  AddButtonStyle
> {
  makeStyle(): AddButtonStyle {
    return makeAddButtonStyle(this.props.theme);
  }
  renderIcon = (): React.ReactElement =>
    Platform.OS === 'android' ? (
      <View style={this.state.styles.actionButtonIconContainer}>
        <Icon
          name={'plus'}
          color={this.props.theme.colors.background}
          size={16}
        />
      </View>
    ) : (
      <Icon name={'plus'} color={this.props.theme.colors.primary} size={16} />
    );

  render() {
    if (Platform.OS === 'android') {
      return (
        <FAB
          style={this.state.styles.FAB}
          icon={this.renderIcon}
          color={this.props.theme.colors.primary}
          onPress={this.props.add}
        />
      );
    } else {
      /* */
      return (
        <TouchableOpacity
          onPress={this.props.add}
          style={this.state.styles.iosIcon}>
          {this.renderIcon()}
        </TouchableOpacity>
      );
    }
  }
}

export const AddButton = withTheme(_AddButton);
