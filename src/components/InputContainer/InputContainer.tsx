import React from 'react';
import {Text, View} from 'react-native';
import {
  InputContainerStyle,
  makeInputContainerStyle,
} from './InputContainer.style';
import {InputContainerProps} from './InputContainer.props';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {withTheme} from 'react-native-paper';

class _InputContainer extends DynamiclyStyledPureComponent<
  InputContainerProps,
  InputContainerStyle,
  {styles: InputContainerStyle}
> {
  makeStyle() {
    return makeInputContainerStyle(this.props.theme, this.props.height);
  }

  render = () => {
    return (
      <View style={[this.state.styles.container, this.props.containerStyle]}>
        <Text
          style={this.state.styles.label}
          key={'InputContainer_' + this.props.title}>
          {this.props.title}
        </Text>
        {this.props.children}
      </View>
    );
  };
}

export const InputContainer = withTheme(_InputContainer);
