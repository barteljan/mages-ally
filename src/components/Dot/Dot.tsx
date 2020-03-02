import React, {PureComponent} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DotProps} from './Dot.props';
import {TouchableOpacity} from 'react-native';
export class Dot extends PureComponent<DotProps> {
  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.value);
    }
  };
  render() {
    let iconProps = {};
    if (this.props.seleced) {
      iconProps = {solid: true};
    } else {
      iconProps = {light: true};
    }
    const color = this.props.color ? this.props.color : '#000000';

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={this.props.containerStyle}
        onPress={this.onPress}>
        <Icon
          name={'circle'}
          size={this.props.size}
          {...iconProps}
          color={color}
        />
      </TouchableOpacity>
    );
  }
}
