import produce from 'immer';
import {SpellRollState} from '../Spell.state';
import {SpellActions, SpellActionTypes} from '../Spell.actions';
import {SpellLogicValueIdentifier} from '../Spell.identifiers';
import {ParadoxResolution} from '../../../rules/spells/paradox/ParadoxResolution';

export const spellRollStateReducer: (
  paradox: SpellRollState,
  action: SpellActions,
) => SpellRollState = produce(
  (roll: SpellRollState, action: SpellActions): void => {
    if (!Object.values(SpellActionTypes).includes(action.type)) {
      return;
    }

    switch (action.type) {
      //set number in config
      case SpellActionTypes.setNumberValue:
        switch (action.payload.identifier) {
          case SpellLogicValueIdentifier.paradoxRollSuccesses: {
            roll.config.successesOnParadoxRoll = action.payload.value;
            break;
          }
        }
        break;
      //set number in config
      case SpellActionTypes.setStringValue:
        switch (action.payload.identifier) {
          case SpellLogicValueIdentifier.paradoxResolution:
            roll.config.paradoxResolution = action.payload
              .value as ParadoxResolution;
            break;
        }
        break;
      case SpellActionTypes.setBooleanValue:
        switch (action.payload.identifier) {
          case SpellLogicValueIdentifier.rollParadoxFirst:
            roll.config.rollParadox = action.payload.value;
            break;
          case SpellLogicValueIdentifier.rollWisdomToContainParadox:
            roll.config.rollWisdomToContainParadox = action.payload.value;
            break;
        }
        break;

      case SpellActionTypes.didRollSpellDice:
        const paradoxRoll = action.payload.result.paradoxRoll;
        const containRoll = action.payload.result.containParadoxRoll;
        const spellRoll = action.payload.result.spellRoll;

        if (paradoxRoll) {
          roll.paradoxRollId = paradoxRoll.id;
        }

        if (containRoll) {
          roll.containParadoxRollId = containRoll.id;
        }

        if (spellRoll) {
          roll.spellRollId = spellRoll.id;
        }

        break;
    }
  },
);
