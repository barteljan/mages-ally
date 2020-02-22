import {StyleSheet, ViewStyle} from 'react-native';

export type DiceSelectStyles = {
  container: ViewStyle;
  diceGroup: ViewStyle;
};

export const diceSelectStyles = StyleSheet.create<DiceSelectStyles>({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  diceGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});
