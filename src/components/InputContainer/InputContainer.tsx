import React from 'react';
import {Text} from 'react-native';
import {
  InputContainerStyle,
  makeInputContainerStyle,
} from './InputContainer.style';
import {InputContainerProps} from './InputContainer.props';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {withTheme, Surface} from 'react-native-paper';

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
      <Surface style={[this.state.styles.container, this.props.containerStyle]}>
        <Text
          style={[this.state.styles.label, this.props.titleStyle]}
          key={'InputContainer_' + this.props.title}>
          {this.props.title}
        </Text>
        {this.props.children}
      </Surface>
    );
  };
}

export const InputContainer = withTheme(_InputContainer);
