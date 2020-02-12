export interface GnosisRule {
  gnosis: number;
  ritualInterval: number;
  ritualIntervalTimeUnit: 'minutes' | 'hour';
  manaLimit: number;
  manaPerTurn: number;
  traitMax: number;
  yantrasMax: number;
  paradoxCreated: number;
  combinedSpells: number;
  obsessions: number;
  highestArcanumMax: number;
  otherArcanumMax: number;
}
