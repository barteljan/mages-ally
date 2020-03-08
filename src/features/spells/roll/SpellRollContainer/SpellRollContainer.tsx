import React, {PureComponent} from 'react';
import {View, LayoutAnimation, TouchableOpacity} from 'react-native';
import {SpellRollContainerProps} from './SpellRollContainer.props';
import {
  SpellRollContainerStyles,
  makeSpellRollContainerStyles,
} from './SpellRollContainer.styles';
import {isEqual} from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MultipleDiceView} from '../../../../components/MultipleDiceView/MultipleDiceView';
import Markdown from 'react-native-markdown-renderer';

type SpellRollContainerState = {
  styles: SpellRollContainerStyles;
  collapsed: boolean;
};

export class SpellRollContainer extends PureComponent<
  SpellRollContainerProps,
  SpellRollContainerState
> {
  state = {
    styles: this.makeStyle(),
    collapsed: true,
  };

  makeStyle() {
    return makeSpellRollContainerStyles(this.props.theme);
  }

  componentDidUpdate(
    prevProps: SpellRollContainerProps,
    prevState: SpellRollContainerState,
  ) {
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles: styles});
    }

    if (prevProps && !isEqual(prevProps.roll, this.props.roll)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({collapsed: true});
    }

    if (prevState && prevState.collapsed !== this.state.collapsed) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }

  onSwitchCollapse = () => this.setState({collapsed: !this.state.collapsed});

  render() {
    const styles = this.state.styles;

    const content =
      this.props.roll && !this.state.collapsed ? (
        <View>
          <MultipleDiceView
            theme={this.props.theme}
            dices={this.props.roll.rolledDice}
            difficulty={this.props.roll.configuration.difficulty}
            parent={this.props.roll.configuration.id}
            containerStyle={styles.diceContainer}
          />
        </View>
      ) : null;

    const icon =
      this.props.roll && this.props.roll.rolledDice ? (
        <Icon
          name={this.state.collapsed ? 'angle-down' : 'angle-up'}
          size={18}
          onPress={this.onSwitchCollapse}
          color={this.props.theme.colors.disabled}
        />
      ) : null;

    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        activeOpacity={1.0}
        onPress={this.onSwitchCollapse}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <Markdown style={styles.rollTitle}>{this.props.title}</Markdown>
          </View>
          {icon}
        </View>
        {content}
      </TouchableOpacity>
    );
  }
}
