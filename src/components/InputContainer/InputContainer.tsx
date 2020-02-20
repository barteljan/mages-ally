import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import {style} from './InputContainer.style';
import {InputContainerProps} from './InputContainer.props';
export class InputContainer extends PureComponent<InputContainerProps> {
  render = () => {
    return (
      <View style={[style.container, this.props.containerStyle]}>
        <Text style={style.label} key={'InputContainer_' + this.props.title}>
          {this.props.title}
        </Text>
        {this.props.children}
      </View>
    );
  };
}
