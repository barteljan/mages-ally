import {Theme} from 'react-native-paper';
import {DiceRoll} from '../../../../rules/dice-roll/DiceRoll';
import {ViewStyle, TextStyle} from 'react-native';

export type RollInformationViewProps = {
  theme: Theme;
  roll: DiceRoll;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};
