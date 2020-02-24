import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import {spellFactorLevelName} from '../../../../../rules/spells/spell-factors/SpellFactor.strings';
import {spellFactorLabel} from '../../../../../rules/spells/spell-factors/SpellFactor.labels';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SpellFactorRowProps} from './SpellFactorRow.props';
import {SpellFactorOverlay} from '../overlay/SpellFactorOverlay';
import {style} from './SpellFactorRow.styles';
import {SpellFactorSelectionList} from '../SpellFactorSection';

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
      this.props.factor.spellFactorType,
      this.props.factor.level,
      this.props.factor.value,
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
          <Text>{spellFactorLevelName(this.props.factor.level)}</Text>
        </View>
        <SpellFactorOverlay
          theme={this.props.theme}
          isVisible={this.state.showOverlay}
          factor={this.props.factor.spellFactorType}
          level={this.props.factor.level}
          identifier={this.props.factor.spellFactorType}
          onBackdropPress={this.hideOverlay}
          standardComponent={
            <SpellFactorSelectionList
              spellFactor={this.props.factor}
              primaryFactor={this.props.primaryFactor}
              highestArcanumValue={this.props.highestArcanumValue}
              gnosis={this.props.gnosis}
              parent={this.props.parent}
              close={this.hideOverlay}
              setSpellFactorValue={this.props.setSpellFactorValue}
            />
          }
          advancedComponent={
            <SpellFactorSelectionList
              spellFactor={this.props.factor}
              primaryFactor={this.props.primaryFactor}
              highestArcanumValue={this.props.highestArcanumValue}
              gnosis={this.props.gnosis}
              parent={this.props.parent}
              close={this.hideOverlay}
              setSpellFactorValue={this.props.setSpellFactorValue}
            />
          }
          parent={this.props.parent}
          setSpellFactorLevel={this.props.setSpellFactorLevel}
        />
      </TouchableWithoutFeedback>
    );
  }
}
