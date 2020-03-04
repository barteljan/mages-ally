import {ParadoxResolution} from '../paradox/ParadoxResolution';

export type SpellRollConfiguration = {
  rollParadox: boolean;
  successesOnParadoxRoll: number;
  paradoxResolution: ParadoxResolution;
  rollWisdomToContainParadox: boolean;
};

export const makeSpellRollConfiguration = (
  config?: Partial<SpellRollConfiguration>,
): SpellRollConfiguration => {
  return {
    rollParadox: true,
    rollWisdomToContainParadox: true,
    successesOnParadoxRoll: 0,
    paradoxResolution: ParadoxResolution.release,
    ...config,
  };
};
