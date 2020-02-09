import {Platform} from 'react-native';

export enum FontSize {
  header = 18,
  button = Platform.OS === 'android' ? 22 : 18,
  small = 12,
}

export enum Font {
  header = 'Arial',
  button = 'Arial',
}
