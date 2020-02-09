import React from 'react';
import FloatingButton from 'react-native-action-button';
import {Colors} from '../../layout/Colors';
import {ActionButtonProps} from './ActionButton.props';
import {Platform, Text, TouchableOpacity, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {style} from './ActionButton.style';

export class ActionButton extends React.PureComponent<ActionButtonProps> {
  renderIcon = (): React.ReactElement =>
    Platform.OS === 'android' ? (
      <View>
        <Image
          style={style.actionButtonIcon}
          source={require('../../ressources/images/d10.png')}
        />
        <Text style={style.actionButtonIconText}>{'1'}</Text>
      </View>
    ) : (
      <Icon name={'plus'} color={Colors.iconColor} size={16} />
    );

  render() {
    if (Platform.OS === 'android') {
      return (
        <FloatingButton
          renderIcon={this.renderIcon}
          buttonColor={Colors.accentColor}
          onPress={this.props.addRoll}
        />
      );
    } else {
      /* */
      return (
        <TouchableOpacity onPress={this.props.addRoll} style={style.iosIcon}>
          {this.renderIcon()}
        </TouchableOpacity>
      );
    }
  }
}
