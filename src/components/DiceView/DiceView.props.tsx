import {TextStyle, ViewStyle, ImageStyle} from 'react-native';
export type DiceViewProps = {
  index: number;
  diceImageStyle?: ImageStyle;
  diceTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onPress?: (index: number) => void;
};
