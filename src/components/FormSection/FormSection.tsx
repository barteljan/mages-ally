import React from 'react';
import {View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {FormSectionProps} from './FormSection.props';
import {withTheme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {FormSectionStyles, makeFormSectionStyles} from './FromSection.styles';

class _FormSection extends DynamiclyStyledPureComponent<
  FormSectionProps,
  FormSectionStyles
> {
  onChangeCollapse = () => {
    this.props.onChangeCollapse(!this.props.collapsed);
  };

  makeStyle() {
    return makeFormSectionStyles(this.props.theme, this.props.collapsed);
  }

  render() {
    const props = this.props;
    const content = props.collapsed ? null : props.children;
    const title = props.title(props.identifier, props.collapsed);
    return (
      <View style={[this.state.styles.container, props.containerStyles]}>
        <TouchableWithoutFeedback
          onPress={this.onChangeCollapse}
          style={props.titleContainerStyle}>
          {title}
        </TouchableWithoutFeedback>
        <View style={props.contentContainerStyle}>{content}</View>
      </View>
    );
  }
}

export const FormSection = withTheme(_FormSection);
