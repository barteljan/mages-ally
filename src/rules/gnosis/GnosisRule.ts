export enum RitualIntervalUnit {
  hour = 'hour',
  minute = 'minute',
}

export type GnosisRules = {
  gnosis: number;
  ritualInterval: number;
  ritualIntervalTimeUnit: RitualIntervalUnit;
  manaLimit: number;
  manaPerTurn: number;
  traitMax: number;
  yantrasMax: number;
  paradoxCreated: number;
  combinedSpells: number;
  obsessions: number;
  highestArcanumMax: number;
  otherArcanumMax: number;
};
