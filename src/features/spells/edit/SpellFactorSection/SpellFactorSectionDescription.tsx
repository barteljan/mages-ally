import React from 'react';
import {Text, View} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {makeSpellFactorSectionDescriptionStyle} from './SpellFactorSectionDescription.style';
import {SpellFactorSectionDescriptionStyle} from './SpellFactorSectionDescription.style';
import {SpellFactorSectionDescriptionProps} from './SpellFactorSectionDescription.props';
import {spellFactorName} from '../../../../rules/spells/spell-factors/SpellFactor.strings';
import {SpellFactorType} from '../../../../rules/spells/spell-factors/SpellFactor.type';
import {spellFactorLabel} from '../../../../rules/spells/spell-factors/SpellFactor.labels';

export class SpellFactorSectionDescription extends DynamiclyStyledPureComponent<
  SpellFactorSectionDescriptionProps,
  SpellFactorSectionDescriptionStyle
> {
  makeStyle() {
    return makeSpellFactorSectionDescriptionStyle(
      this.props.theme,
      this.props.labelStyle,
    );
  }

  render = () => {
    const style = this.state.styles;
    const config = this.props.spellCastingConfig;
    const factors = config.spell.spellFactors;
    const gnosis = config.caster.gnosis.diceModifier;
    const primaryFactor = config.spell.primaryFactor;
    const highesArcanumValue = config.caster.highestSpellArcanum.diceModifier;
    const potency = factors.potency;
    const castingTime = factors.castingTime;
    const duration = factors.duration;
    const range = factors.range;
    const scale = factors.scale;
    const showDices = this.props.showDices;

    return (
      <View style={style.container}>
        <View style={style.infoContainer}>
          <Text style={style.label}>
            {spellFactorName(SpellFactorType.potency) +
              ': ' +
              spellFactorLabel(
                SpellFactorType.potency,
                potency.level,
                potency.value,
                gnosis,
                primaryFactor,
                highesArcanumValue,
                showDices,
              )}
          </Text>
        </View>
        <View style={style.infoContainer}>
          <Text style={style.label}>
            {spellFactorName(SpellFactorType.castingTime) +
              ': ' +
              spellFactorLabel(
                SpellFactorType.castingTime,
                castingTime.level,
                castingTime.value,
                gnosis,
                primaryFactor,
                highesArcanumValue,
                showDices,
              )}
          </Text>
        </View>
        <View style={style.infoContainer}>
          <Text style={style.label}>
            {spellFactorName(SpellFactorType.duration) +
              ': ' +
              spellFactorLabel(
                SpellFactorType.duration,
                duration.level,
                duration.value,
                gnosis,
                primaryFactor,
                highesArcanumValue,
                showDices,
              )}
          </Text>
        </View>
        <View style={style.infoContainer}>
          <Text style={style.label}>
            {spellFactorName(SpellFactorType.range) +
              ': ' +
              spellFactorLabel(
                SpellFactorType.range,
                range.level,
                range.value,
                gnosis,
                primaryFactor,
                highesArcanumValue,
                showDices,
              )}
          </Text>
        </View>
        <View style={style.infoContainer}>
          <Text style={style.label}>
            {spellFactorName(SpellFactorType.scale) +
              ': ' +
              spellFactorLabel(
                SpellFactorType.scale,
                scale.level,
                scale.value,
                gnosis,
                primaryFactor,
                highesArcanumValue,
                showDices,
              )}
          </Text>
        </View>
      </View>
    );
  };
}
