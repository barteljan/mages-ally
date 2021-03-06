export enum DiceRollAgainType {
  tenAgain = '10again',
  nineAgain = '9again',
  eightAgain = '8again',
  none = 'none',
}

function typeOrder(type: DiceRollAgainType): number {
  switch (type) {
    case DiceRollAgainType.none:
      return 0;
    case DiceRollAgainType.tenAgain:
      return 1;
    case DiceRollAgainType.nineAgain:
      return 2;
    case DiceRollAgainType.eightAgain:
      return 3;
  }
  return 0;
}

export function bestRollAgainType(
  type1: DiceRollAgainType,
  type2: DiceRollAgainType,
): DiceRollAgainType {
  const type1SortOrder = typeOrder(type1);
  const type2SortOrder = typeOrder(type1);

  if (type2SortOrder > type1SortOrder) {
    return type2;
  } else {
    return type1;
  }
}
