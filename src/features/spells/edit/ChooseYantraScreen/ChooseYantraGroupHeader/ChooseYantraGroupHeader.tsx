import React from 'react';
import {DynamiclyStyledPureComponent} from '../../../../../components/DynamiclyStyledPureComponent';
import {Theme} from 'react-native-paper';
import {Text, StyleSheet, View} from 'react-native';
import {ChooseYantraGroupHeaderStyle} from './ChooseYantraGroupHeader.style';
import {ChooseYantraGroupHeaderProps} from './ChooseYantraGroupHeader.props';

export const makeChooseYantraGroupHeaderStyle = (theme: Theme) =>
  StyleSheet.create<ChooseYantraGroupHeaderStyle>({
    container: {
      paddingHorizontal: 15,
      paddingTop: 20,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      paddingHorizontal: 15,
      height: 52,
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.disabled,
      borderWidth: 1,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    label: {
      fontSize: 18,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });

export class ChooseYantraGroupHeader extends DynamiclyStyledPureComponent<
  ChooseYantraGroupHeaderProps,
  ChooseYantraGroupHeaderStyle
> {
  makeStyle() {
    return makeChooseYantraGroupHeaderStyle(this.props.theme);
  }

  render() {
    return (
      <View style={this.state.styles.container}>
        <View style={this.state.styles.contentContainer}>
          <Text style={this.state.styles.label}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}
