export enum DiceRollAgainType {
  tenAgain = '10again',
  nineAgain = '9again',
  eightAgain = '8again',
  roteQuality = 'roteQuality',
}

function typeOrder(type: DiceRollAgainType): number {
  switch (type) {
    case DiceRollAgainType.tenAgain:
      return 0;
    case DiceRollAgainType.nineAgain:
      return 1;
    case DiceRollAgainType.eightAgain:
      return 2;
    case DiceRollAgainType.roteQuality:
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
