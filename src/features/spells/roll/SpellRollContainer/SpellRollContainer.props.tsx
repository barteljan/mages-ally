import {Theme} from 'react-native-paper';
import {ViewStyle, StyleProp} from 'react-native';
import {DiceRoll} from '../../../../rules/dice-roll/DiceRoll';
export type SpellRollContainerProps = {
  theme: Theme;
  title: string;
  roll: DiceRoll | undefined;
  containerStyle?: StyleProp<ViewStyle>;
};
