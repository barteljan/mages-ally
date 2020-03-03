import React from 'react';
import {Text, View} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {
  ParadoxSectionDescriptionStyle,
  makeParadoxSectionDescriptionStyle,
} from './ParadoxSectionDescription.styles';
import {ParadoxSectionDescriptionProps} from './ParadoxSectionDescription.props';
import {localization} from '../../Spell.strings';
import {labelForSleeperWittness} from '../../../../rules/spells/paradox/SleeperWittnesses.strings';

export class ParadoxSectionDescription extends DynamiclyStyledPureComponent<
  ParadoxSectionDescriptionProps,
  ParadoxSectionDescriptionStyle
> {
  makeStyle() {
    return makeParadoxSectionDescriptionStyle(this.props.theme);
  }

  render = () => {
    const config = this.props.spellCastingConfig;
    const style = this.state.styles;

    const inured = config.paradox.inuredToSpell ? (
      <View style={style.infoContainer}>
        <Text style={style.label}>{localization.mage_is_inured_to_spell}</Text>
      </View>
    ) : null;

    const previousRolls =
      config.paradox.previousParadoxRolls > 0 ? (
        <View style={style.infoContainer}>
          <Text style={style.label}>
            {localization.previous_paradox_rolls_title +
              ': ' +
              config.paradox.previousParadoxRolls}
          </Text>
        </View>
      ) : null;

    const additionalMana =
      config.paradox.manaSpent > 0 ? (
        <View style={style.infoContainer}>
          <Text style={style.label}>
            {localization.additional_mana_spend_title +
              ': ' +
              config.paradox.manaSpent}
          </Text>
        </View>
      ) : null;
    return (
      <View style={style.container}>
        {inured}
        {previousRolls}
        {additionalMana}
        <View style={style.infoContainer}>
          <Text style={style.label}>
            {localization.witnesses_title +
              ': ' +
              labelForSleeperWittness(config.paradox.sleeperWitnesses)}
          </Text>
        </View>
      </View>
    );
  };
}
