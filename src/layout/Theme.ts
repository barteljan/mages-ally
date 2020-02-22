import {DefaultTheme, Theme} from 'react-native-paper';

export const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    primary: '#3498db',
    accent: '#111111',
    disabled: '#666666',
    surface: '#efefef',
    error: '#FF6C00',
  },
};
