export interface SpellFactorRuleLevel {
  description?: string;
  diceModifier: number;
}

export interface SpellFactorRules {
  standard: SpellFactorRuleLevel[];
  advanced: SpellFactorRuleLevel[];
}
