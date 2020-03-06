import {SpellSpecification} from '../../../rules/spells/Spell.config.specification';
import {SpellActions, SpellActionTypes} from '../Spell.actions';
import produce from 'immer';
import {SpellValueIds} from '../../../rules/spells/spell-values/SpellValueIds';
import {YantraType} from '../../../rules/spells/yantra/Yantra.type';
import {
  makeRoteYantra,
  makeCustomYantra,
  Yantra,
} from '../../../rules/spells/yantra/yantra';
import {SpellType} from '../../../rules/spells/Spell.type';
import {SpellFactorType} from '../../../rules/spells/spell-factors/SpellFactor.type';
import {DiceRollAgainType} from '../../../rules/dice-roll/DiceRollAgainType';
import {SpellFactorLevel} from '../../../rules/spells/spell-factors/SpellFactor.level';
import uuid from 'uuid';

export const spellSpecificationReducer: (
  specification: SpellSpecification,
  action: SpellActions,
) => SpellSpecification = produce(
  (specification: SpellSpecification, action: SpellActions): void => {
    if (!Object.values(SpellActionTypes).includes(action.type)) {
      return;
    }

    switch (action.type) {
      //set number in config
      case SpellActionTypes.setNumberValue:
        switch (action.payload.identifier) {
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
          case SpellValueIds.extraReach: {
            specification.additionalSpecs.extraReach = action.payload.value;
            break;
          }
        }
        break;
      //set number in config
      case SpellActionTypes.setStringValue:
        switch (action.payload.identifier) {
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
        }
        break;
      case SpellActionTypes.setBooleanValue:
        switch (action.payload.identifier) {
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
        }
        break;
      case SpellActionTypes.setSpellFactorLevel: {
        let spellFactor = specification.spellFactors[action.payload.factor];
        if (spellFactor.level !== action.payload.level) {
          spellFactor.level = action.payload.level;
          spellFactor.value = 1;
        }
        break;
      }
      case SpellActionTypes.setSpellFactorValue: {
        let spellFactor = specification.spellFactors[action.payload.factor];

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

        specification.yantras = specification.yantras.filter(
          yantra => yantra.id !== id,
        );

        break;
      }
      case SpellActionTypes.selectedYantra: {
        let yantra = action.payload.yantra;

        if (yantra.unique) {
          const currentYantraIds = specification.yantras.map(item => item.id);
          if (!currentYantraIds.includes(yantra.id)) {
            specification.yantras.unshift(yantra);
          }
        } else {
          const newYantra = {...yantra, id: uuid.v4()} as Yantra;
          specification.yantras.unshift(newYantra);
        }
        break;
      }
      case SpellActionTypes.setYantraValue: {
        let yantra = specification.yantras.filter(
          yan => yan.id === action.payload.identifier,
        );

        if (yantra && yantra.length > 0) {
          yantra[0].diceModifier = action.payload.value;
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
    }
  },
);
