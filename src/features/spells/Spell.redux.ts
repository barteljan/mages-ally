import {SpellCastingConfig} from '../../rules/spells/Spell.config';
import {createAction, ActionType} from 'typesafe-actions';
import produce from 'immer';
import {CharacterValueId} from '../../rules/character/CharacterValue.id';
import {SpellValueIds} from '../../rules/spells/spell-values/SpellValueIds';
import {ArcanaType} from '../../rules/spells/arcana/Arcana.type';
import StringMap from '../../data-types/StringMap';
import {SpellStatus} from './Spell.status';
import {SpellFactorType} from '../../rules/spells/spell-factors/SpellFactor.type';
import {SpellType} from '../../rules/spells/Spell.type';
import {YantraType} from '../../rules/spells/yantra/Yantra.type';
import {makeRoteYantra, Yantra} from '../../rules/spells/yantra/yantra';
import {
  DefaultAdditionalDiceModifier,
  makeDefaultAdditionalSpellCastingDice,
} from '../../rules/spells/Spell.config.caster';
import {SpellFactorLevel} from '../../rules/spells/spell-factors/SpellFactor.level';
import {Spell} from '../../rules/spells/Spell';
import {spellFromConfig} from '../../rules/spells/calculations/spellFromConfig';
import uuid from 'uuid';

export type SpellsState = {
  spells: StringMap<SpellState>;
};

export type SpellState = {
  spellCastingConfig: SpellCastingConfig;
  status: SpellStatus;
  spell: Spell;
};

export enum SpellActionTypes {
  setNumberValue = 'spell/edit/setNumberValue',
  setStringValue = 'spell/edit/setStringValue',
  setBooleanValue = 'spell/edit/setBooleanValue',
  setSpellFactorLevel = 'spell/edit/setSpellFactorLevel',
  setSpellFactorValue = 'spell/edit/setSpellFactorValue',
  deleteYantra = 'spell/edit/deleteYantra',
  selectedYantra = 'spell/edit/selectedYantra',
  setYantraValue = 'spell/edit/setYantraValue',
}

export const setNumberValueAction = createAction(
  SpellActionTypes.setNumberValue,
  (identifier: string, value: number, parent: string) => {
    return {
      identifier,
      value,
      parent,
    };
  },
)();

export const setStringValueAction = createAction(
  SpellActionTypes.setStringValue,
  (identifier: string, value: string | undefined, parent: string) => {
    return {
      identifier,
      value,
      parent,
    };
  },
)();

export const setBooleanValueAction = createAction(
  SpellActionTypes.setBooleanValue,
  (identifier: string, value: boolean, parent: string) => {
    return {
      identifier,
      value,
      parent,
    };
  },
)();

export const setSpellFactorLevelAction = createAction(
  SpellActionTypes.setSpellFactorLevel,
  (factor: SpellFactorType, level: SpellFactorLevel, parent: string) => {
    return {
      factor,
      level,
      parent,
    };
  },
)();

export const setSpellFactorValueAction = createAction(
  SpellActionTypes.setSpellFactorValue,
  (factor: SpellFactorType, value: number, parent: string) => {
    return {
      factor,
      value,
      parent,
    };
  },
)();

export const deleteYantraAction = createAction(
  SpellActionTypes.deleteYantra,
  (id: string, parent: string) => {
    return {
      id,
      parent,
    };
  },
)();

export const selectedYantraAction = createAction(
  SpellActionTypes.selectedYantra,
  (yantra: Yantra, parent: string) => {
    return {
      yantra,
      parent,
    };
  },
)();

export const setYantraValueAction = createAction(
  SpellActionTypes.setYantraValue,
  (identifier: string, value: number, parent: string) => {
    return {
      identifier,
      value,
      parent,
    };
  },
)();

const actions = {
  setNumberValueAction,
  setStringValueAction,
  setBooleanValueAction,
  setSpellFactorLevelAction,
  setSpellFactorValueAction,
  deleteYantraAction,
  selectedYantraAction,
  setYantraValueAction,
};

export type SpellActions = ActionType<typeof actions>;

export const spellReducer = produce(
  (draft: SpellsState, action: SpellActions): void => {
    if (!Object.values(SpellActionTypes).includes(action.type)) {
      return;
    }

    let spell = draft.spells[action.payload.parent];
    let config = spell.spellCastingConfig;
    let caster = config.caster;
    let specification = config.spell;

    switch (action.type) {
      //set number in config
      case SpellActionTypes.setNumberValue:
        switch (action.payload.identifier) {
          case CharacterValueId.gnosis:
            caster.gnosis.diceModifier = action.payload.value;
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
          case SpellValueIds.spellType:
            const type = action.payload.value as SpellType;
            specification.type = type;
            if (type !== SpellType.rote) {
              specification.yantras = specification.yantras.filter(
                yantra => yantra.yantraType !== YantraType.roteSkill,
              );
            }
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
      }
    }

    spell.spell = spellFromConfig(spell.spellCastingConfig);
  },
);
