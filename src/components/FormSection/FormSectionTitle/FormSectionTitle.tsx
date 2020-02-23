import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {style} from './FormSectionTitle.styles';
import {FormSectionTitleProps} from './FormSectionTitle.props';

export class FormSectionTitle extends PureComponent<FormSectionTitleProps> {
  render() {
    const description = this.props.collapsed ? this.props.description : null;
    return (
      <View style={style.container}>
        <View style={style.titleRow}>
          <Icon style={style.icon} name={this.props.iconName} size={18} />
          <Text style={style.title}>{this.props.title}</Text>
          <View style={style.collapser}>
            <Icon
              name={this.props.collapsed ? 'angle-down' : 'angle-up'}
              size={18}
            />
          </View>
        </View>
        {description}
      </View>
    );
  }
}
