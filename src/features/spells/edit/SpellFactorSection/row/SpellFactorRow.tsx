import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import {spellFactorLevelName} from '../../../../../rules/spells/spell-factors/SpellFactor.strings';
import {spellFactorLabel} from '../../../../../rules/spells/spell-factors/SpellFactor.labels';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SpellFactorRowProps} from './SpellFactorRow.props';
import {SpellFactorOverlay} from '../overlay/SpellFactorOverlay';
import {style} from './SpellFactorRow.styles';

export type SpellFactorRowState = {
  showOverlay: boolean;
};

export class SpellFactorRow extends PureComponent<
  SpellFactorRowProps,
  SpellFactorRowState
> {
  state = {
    showOverlay: false,
  };
  onPress = () => {
    this.setState({showOverlay: true});
  };
  hideOverlay = () => {
    this.setState({showOverlay: false});
  };
  render() {
    let label = spellFactorLabel(
      this.props.type,
      this.props.level,
      this.props.value,
      this.props.gnosis,
      this.props.primaryFactor,
      this.props.highestArcanumValue,
    );
    return (
      <TouchableWithoutFeedback
        style={[style.container, this.props.containerStyle]}
        onPress={this.onPress}>
        <Text style={style.label}>{label}</Text>
        <View style={style.level}>
          <Text>{spellFactorLevelName(this.props.level)}</Text>
        </View>
        <SpellFactorOverlay
          theme={this.props.theme}
          isVisible={this.state.showOverlay}
          factor={this.props.type}
          level={this.props.level}
          identifier={this.props.type}
          onBackdropPress={this.hideOverlay}
          {...this.props}
        />
      </TouchableWithoutFeedback>
    );
  }
}
