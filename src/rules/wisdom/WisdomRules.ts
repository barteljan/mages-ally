export type WisdomRule = {
  containParadoxConditionDuration: string;
  releaseParadoxConditionDuration: string;
  title: string;
};

export const makeWisdomRules = (): WisdomRule[] => {
  return [
    {
      title: 'Mad',
      containParadoxConditionDuration: 'one turn',
      releaseParadoxConditionDuration: 'one chronicle/year',
    },
    {
      title: 'Falling',
      containParadoxConditionDuration: 'one scene',
      releaseParadoxConditionDuration: 'one story/month',
    },
    {
      title: 'Falling',
      containParadoxConditionDuration: 'one scene',
      releaseParadoxConditionDuration: 'one story/month',
    },
    {
      title: 'Falling',
      containParadoxConditionDuration: 'one scene',
      releaseParadoxConditionDuration: 'one story/month',
    },
    {
      title: 'Understanding',
      containParadoxConditionDuration: 'one chapter/day',
      releaseParadoxConditionDuration: 'one chapter/day',
    },
    {
      title: 'Understanding',
      containParadoxConditionDuration: 'one chapter/day',
      releaseParadoxConditionDuration: 'one chapter/day',
    },
    {
      title: 'Understanding',
      containParadoxConditionDuration: 'one chapter/day',
      releaseParadoxConditionDuration: 'one chapter/day',
    },
    {
      title: 'Understanding',
      containParadoxConditionDuration: 'one chapter/day',
      releaseParadoxConditionDuration: 'one chapter/day',
    },
    {
      title: 'Enlightened',
      containParadoxConditionDuration: 'one story/month',
      releaseParadoxConditionDuration: 'one scene',
    },
  ];
};
