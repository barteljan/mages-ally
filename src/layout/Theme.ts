import {DefaultTheme, Theme} from 'react-native-paper';

export const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: '#efefef',
    primary: '#3499DB',
    accent: '#3499DB',
    disabled: '#666666',
    surface: '#ffffff',
    error: '#FF6C00',
  },
};
