import {Platform} from 'react-native';

export enum FontSize {
  header = 22,
  button = Platform.OS === 'android' ? 22 : 18,
  small = 12,
}
