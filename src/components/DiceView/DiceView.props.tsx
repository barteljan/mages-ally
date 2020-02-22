import {TextStyle, ViewStyle, ImageStyle} from 'react-native';
import {Theme} from 'react-native-paper';
export type DiceViewProps = {
  index: number;
  diceImageStyle?: ImageStyle;
  diceTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  theme: Theme;
  onPress?: (index: number) => void;
};
