export interface YantraRules {
  name: string;
  desc: string;
  minBonus: number;
  maxBonus?: number;
  value?: number;
  unique: boolean;
}
