import produce from 'immer';
import {SpellActions, SpellActionTypes} from '../Spell.actions';
import {
  SpellCaster,
  makeDefaultAdditionalSpellCastingDice,
  DefaultAdditionalDiceModifier,
} from '../../../rules/spells/Spell.config.caster';
import {CharacterValueId} from '../../../rules/character/CharacterValue.id';
import {SpellValueIds} from '../../../rules/spells/spell-values/SpellValueIds';
import {ArcanaType} from '../../../rules/spells/arcana/Arcana.type';

export const spellCasterReducer: (
  caster: SpellCaster,
  action: SpellActions,
) => SpellCaster = produce(
  (caster: SpellCaster, action: SpellActions): void => {
    if (!Object.values(SpellActionTypes).includes(action.type)) {
      return;
    }

    switch (action.type) {
      //set number in config
      case SpellActionTypes.setNumberValue:
        switch (action.payload.identifier) {
          case CharacterValueId.gnosis:
            caster.gnosis.diceModifier = action.payload.value;
            break;
          case CharacterValueId.wisdom:
            caster.wisdom.diceModifier = action.payload.value;
            break;
          case SpellValueIds.highestArcanumValue:
            caster.highestSpellArcanum.diceModifier = action.payload.value;
            break;
          case SpellValueIds.activeSpells:
            caster.activeSpells = action.payload.value;
            break;
          case SpellValueIds.additionalDice: {
            const additionalDice =
              caster.additionalSpellCastingDice[
                DefaultAdditionalDiceModifier.default
              ];
            if (additionalDice) {
              additionalDice.diceModifier = action.payload.value;
            } else {
              caster.additionalSpellCastingDice[
                DefaultAdditionalDiceModifier.default
              ] = makeDefaultAdditionalSpellCastingDice({
                diceModifier: action.payload.value,
              });
            }
            break;
          }
        }
        break;
      case SpellActionTypes.setStringValue:
        switch (action.payload.identifier) {
          case SpellValueIds.highestArcanum:
            caster.highestSpellArcanum.arcanumType = action.payload
              .value as ArcanaType;
            break;
        }
        break;
      case SpellActionTypes.setBooleanValue:
        switch (action.payload.identifier) {
          case SpellValueIds.isMagesHighestArcanum:
            caster.highestSpellArcanum.highest = action.payload.value;
            break;
          case SpellValueIds.isMagesRulingArcanum:
            caster.highestSpellArcanum.rulingArcana = action.payload.value;
            break;
          case CharacterValueId.willpower:
            caster.spendsWillpower = action.payload.value;
            break;
        }
        break;
    }
  },
);
