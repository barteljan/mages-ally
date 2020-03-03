import {TextStyle, ViewStyle, ImageStyle} from 'react-native';
import {Theme} from 'react-native-paper';
export type DiceViewProps = {
  index: number;
  diceImageStyle?: ImageStyle;
  diceTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  theme: Theme;
  scale?: number;
  onPress?: (index: number) => void;
  activeOpacity?: number;
};
