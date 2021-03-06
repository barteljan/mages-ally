import React from 'react';
import {localization, activeSpellsSummary} from '../../Spell.strings';
import {CharacterValueId} from '../../../../rules/character/CharacterValue.id';
import {DotSelect} from '../../../../components/DotSelect/DotSelect';
import {SpellValueIds} from '../../../../rules/spells/spell-values/SpellValueIds';
import {localization as arkanaLocalization} from '../../../../rules/spells/arcana/Arcana.strings';
import {Text, View} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {castersArkanumSummary} from '../../../../rules/spells/Spell.config.strings';
import {makeCasterSectionDescriptionStyle} from './CasterSectionDescription.style';
import {CasterSectionDescriptionStyle} from './CasterSectionDescription.style';
import {CasterSectionDescriptionProps} from './CasterSectionDescription.props';
import {DefaultAdditionalDiceModifier} from '../../../../rules/spells/Spell.config.caster';

export class CasterSectionDescription extends DynamiclyStyledPureComponent<
  CasterSectionDescriptionProps,
  CasterSectionDescriptionStyle
> {
  makeStyle() {
    return makeCasterSectionDescriptionStyle(this.props.theme);
  }

  render = () => {
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const caster = config.caster;
    const highestArcanum = caster.highestSpellArcanum;
    const style = this.state.styles;
    const dotSize = 10;
    const chosenArkanumTitle: string =
      arkanaLocalization[caster.highestSpellArcanum.arcanumType];
    const casterArcanumSummary = castersArkanumSummary(
      highestArcanum.arcanumType,
      highestArcanum.highest,
      highestArcanum.rulingArcana,
    );
    const activeSpellsDescription =
      caster.activeSpells > 0 ? activeSpellsSummary(caster.activeSpells) : '';
    const hyphen =
      casterArcanumSummary.length > 0 && caster.activeSpells > 0 ? ', ' : '';

    let summary = casterArcanumSummary + hyphen + activeSpellsDescription;

    let additionalDice =
      config.caster.additionalSpellCastingDice[
        DefaultAdditionalDiceModifier.default
      ];

    if (additionalDice && additionalDice.diceModifier > 0) {
      if (summary.length > 0) {
        summary += ', ';
      }
      summary += '+' + additionalDice.diceModifier + ' ' + localization.dice;
    } else if (additionalDice && additionalDice.diceModifier < 0) {
      if (summary.length > 0) {
        summary += ', ';
      }
      summary += additionalDice.diceModifier + ' ' + localization.dice;
    }

    if (config.caster.spendsWillpower) {
      if (summary.length > 0) {
        summary += ', ';
      }
      summary += localization.spends_willpower_description;
    }

    return (
      <View style={style.container}>
        <View style={style.infoContainer}>
          <Text style={style.label}>{localization.gnosis_title}</Text>
          <DotSelect
            key={CharacterValueId.gnosis + 'select'}
            parent={parent}
            value={caster.gnosis.diceModifier}
            identifier={CharacterValueId.gnosis}
            numberOfDots={caster.gnosis.diceModifier}
            dotSize={dotSize}
            color={this.props.theme.colors.disabled}
          />
        </View>
        <View style={style.infoContainer}>
          <Text style={style.label}>{localization.wisdom_title}</Text>
          <DotSelect
            key={CharacterValueId.wisdom + 'select'}
            parent={parent}
            value={caster.wisdom.diceModifier}
            identifier={CharacterValueId.wisdom}
            numberOfDots={caster.wisdom.diceModifier}
            dotSize={dotSize}
            color={this.props.theme.colors.disabled}
          />
        </View>
        <View style={style.infoContainer}>
          <Text style={style.label}>{chosenArkanumTitle}</Text>
          <DotSelect
            key={SpellValueIds.highestArcanumValue + 'select'}
            parent={parent}
            value={caster.highestSpellArcanum.diceModifier}
            identifier={SpellValueIds.highestArcanum}
            numberOfDots={caster.highestSpellArcanum.diceModifier}
            dotSize={dotSize}
            color={this.props.theme.colors.disabled}
          />
        </View>
        <View style={style.infoContainer}>
          <Text style={style.label}>{summary}</Text>
        </View>
      </View>
    );
  };
}
