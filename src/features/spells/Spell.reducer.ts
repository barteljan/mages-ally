import produce from 'immer';
import {SpellActionTypes, SpellActions} from './Spell.actions';
import {SpellsState, SpellState, makeSpellRollState} from './Spell.state';
import {CharacterValueId} from '../../rules/character/CharacterValue.id';
import {SpellValueIds} from '../../rules/spells/spell-values/SpellValueIds';
import {YantraType} from '../../rules/spells/yantra/Yantra.type';
import {SpellType} from '../../rules/spells/Spell.type';
import {
  makeRoteYantra,
  Yantra,
  makeCustomYantra,
} from '../../rules/spells/yantra/yantra';
import {
  DefaultAdditionalDiceModifier,
  makeDefaultAdditionalSpellCastingDice,
} from '../../rules/spells/Spell.config.caster';
import {SpellLogicValueIdentifier} from './Spell.identifiers';
import {ArcanaType} from '../../rules/spells/arcana/Arcana.type';
import {SpellFactorType} from '../../rules/spells/spell-factors/SpellFactor.type';
import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {SleeperWitnesses} from '../../rules/spells/paradox/SleeperWitnesses';
import {ParadoxResolution} from '../../rules/spells/paradox/ParadoxResolution';
import {SpellFactorLevel} from '../../rules/spells/spell-factors/SpellFactor.level';
import uuid from 'uuid';
import {SpellStatus} from './Spell.status';
import {makeSpellCastingConfig} from '../../rules/spells/Spell.config';
import {spellFromConfig} from '../../rules/spells/calculations/spellFromConfig';

export const spellReducer = produce(
  (draft: SpellsState, action: SpellActions): void => {
    if (!Object.values(SpellActionTypes).includes(action.type)) {
      return;
    }

    let spell = draft.spells[action.payload.parent];
    let config = spell.spellCastingConfig;
    let caster = config.caster;
    let specification = config.spell;
    let paradox = config.paradox;

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
          case SpellValueIds.requiredArcanumValue:
            specification.requiredArcanumValue = action.payload.value;
            break;
          case YantraType.roteSkill:
            if (specification.type === SpellType.rote) {
              let foundRote = false;

              specification.yantras.forEach(yantra => {
                if (yantra.yantraType === YantraType.roteSkill) {
                  yantra.diceModifier = action.payload.value;
                  foundRote = true;
                }
              });

              if (!foundRote) {
                const rote = makeRoteYantra(action.payload.value);
                specification.yantras.push(rote);
              }
            }
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
          case SpellValueIds.numberOfPreviousParadoxRolls: {
            paradox.previousParadoxRolls = action.payload.value;
            break;
          }
          case SpellValueIds.additionalManaSpendForReducingParadox: {
            paradox.manaSpent = action.payload.value;
            break;
          }
          case SpellValueIds.extraReach: {
            specification.additionalSpecs.extraReach = action.payload.value;
            break;
          }
          case SpellLogicValueIdentifier.paradoxRollSuccesses: {
            spell.roll.config.successesOnParadoxRoll = action.payload.value;
            break;
          }
        }
        break;
      //set number in config
      case SpellActionTypes.setStringValue:
        switch (action.payload.identifier) {
          case SpellValueIds.title:
            config.title = action.payload.value;
            break;
          case SpellValueIds.highestArcanum:
            caster.highestSpellArcanum.arcanumType = action.payload
              .value as ArcanaType;
            break;
          case SpellValueIds.primaryFactor:
            specification.primaryFactor = action.payload
              .value as SpellFactorType;
            break;
          case SpellValueIds.rollAgainType:
            specification.rollAgainType = action.payload
              .value as DiceRollAgainType;
            break;
          case SpellValueIds.spellType:
            const type = action.payload.value as SpellType;
            specification.type = type;
            if (type !== SpellType.rote) {
              specification.yantras = specification.yantras.filter(
                yantra => yantra.yantraType !== YantraType.roteSkill,
              );
            }
            break;
          case SpellValueIds.sleeperWitnesses:
            paradox.sleeperWitnesses = action.payload.value as SleeperWitnesses;
            break;
          case SpellLogicValueIdentifier.paradoxResolution:
            spell.roll.config.paradoxResolution = action.payload
              .value as ParadoxResolution;
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
          case SpellValueIds.inuredToSpell:
            paradox.inuredToSpell = action.payload.value;
            break;
          case SpellValueIds.everywhere:
            specification.additionalSpecs.everywhere = action.payload.value;
            break;
          case SpellValueIds.symphaticRange:
            specification.additionalSpecs.sympatheticRange =
              action.payload.value;
            break;
          case SpellValueIds.temporalSympathy:
            specification.additionalSpecs.temporalSympathy =
              action.payload.value;
            break;
          case SpellValueIds.timeInABottle:
            specification.additionalSpecs.timeInABottle = action.payload.value;
            break;
          case SpellValueIds.changePrimarySpellFactor:
            specification.additionalSpecs.changePrimarySpellFactor =
              action.payload.value;
            break;
          case SpellLogicValueIdentifier.rollParadoxFirst:
            spell.roll.config.rollParadox = action.payload.value;
            break;
          case SpellLogicValueIdentifier.rollWisdomToContainParadox:
            spell.roll.config.rollWisdomToContainParadox = action.payload.value;
            break;
        }
        break;
      case SpellActionTypes.setSpellFactorLevel: {
        let spellFactor =
          spell.spellCastingConfig.spell.spellFactors[action.payload.factor];
        if (spellFactor.level !== action.payload.level) {
          spellFactor.level = action.payload.level;
          spellFactor.value = 1;
        }
        break;
      }
      case SpellActionTypes.setSpellFactorValue: {
        let spellFactor =
          spell.spellCastingConfig.spell.spellFactors[action.payload.factor];

        switch (spellFactor.level) {
          case SpellFactorLevel.standard:
            if (spellFactor.maxStandardValue >= action.payload.value) {
              spellFactor.value = action.payload.value;
            }
            break;
          case SpellFactorLevel.advanced:
            if (spellFactor.maxAdvancedValue >= action.payload.value) {
              spellFactor.value = action.payload.value;
            }
            break;
        }
        break;
      }
      case SpellActionTypes.deleteYantra: {
        const id = action.payload.id;

        spell.spellCastingConfig.spell.yantras = spell.spellCastingConfig.spell.yantras.filter(
          yantra => yantra.id !== id,
        );

        break;
      }
      case SpellActionTypes.selectedYantra: {
        let yantra = action.payload.yantra;

        if (yantra.unique) {
          const currentYantraIds = spell.spellCastingConfig.spell.yantras.map(
            item => item.id,
          );
          if (!currentYantraIds.includes(yantra.id)) {
            spell.spellCastingConfig.spell.yantras.unshift(yantra);
          }
        } else {
          const newYantra = {...yantra, id: uuid.v4()} as Yantra;
          spell.spellCastingConfig.spell.yantras.unshift(newYantra);
        }
        break;
      }
      case SpellActionTypes.setYantraValue: {
        let yantra = spell.spellCastingConfig.spell.yantras.filter(
          yan => yan.id === action.payload.identifier,
        );

        if (yantra && yantra.length > 0) {
          yantra[0].diceModifier = action.payload.value;
        }
        break;
      }
      case SpellActionTypes.saveSpell: {
        if (
          spell.spellCastingConfig.title &&
          spell.spellCastingConfig.title.length > 0
        ) {
          spell.status = SpellStatus.saved;
          const newConfig = makeSpellCastingConfig();
          const newSpell = spellFromConfig(newConfig);
          const newSpellState: SpellState = {
            spell: newSpell,
            spellCastingConfig: newConfig,
            roll: makeSpellRollState(),
            status: SpellStatus.new,
          };
          draft.spells[newConfig.id] = newSpellState;
        }
        break;
      }
      case SpellActionTypes.addCustomYantra:
        if (action.payload.title && action.payload.title.length > 0) {
          const yantra = makeCustomYantra(
            action.payload.title,
            action.payload.value,
          );
          specification.yantras.unshift(yantra);
        }
        break;
      case SpellActionTypes.didRollSpellDice:
        const paradoxRoll = action.payload.result.paradoxRoll;
        const containRoll = action.payload.result.containParadoxRoll;
        const spellRoll = action.payload.result.spellRoll;

        if (paradoxRoll) {
          spell.roll.paradoxRollId = paradoxRoll.id;
        }

        if (containRoll) {
          spell.roll.containParadoxRollId = containRoll.id;
        }

        if (spellRoll) {
          spell.roll.spellRollId = spellRoll.id;
        }

        break;
    }

    spell.spell = spellFromConfig(spell.spellCastingConfig);
  },
);
