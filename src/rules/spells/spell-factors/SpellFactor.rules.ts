export type SpellFactorRuleLevel = {
  description: string;
  diceModifier: number;
};

export type SpellFactorRules = {
  standard: SpellFactorRuleLevel[];
  advanced: SpellFactorRuleLevel[];
};
