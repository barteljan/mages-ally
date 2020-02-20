import React, {PureComponent} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {DotProps} from './Dot.props';
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
    return (
      <TouchableWithoutFeedback
        style={this.props.containerStyle}
        onPress={this.onPress}>
        <Icon name={'circle'} size={this.props.size} {...iconProps} />
      </TouchableWithoutFeedback>
    );
  }
}
