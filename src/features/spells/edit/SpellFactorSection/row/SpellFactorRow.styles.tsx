import {ViewStyle, StyleSheet} from 'react-native';

export type SpellFactorRowStyle = {
  container: ViewStyle;
  label: ViewStyle;
  level: ViewStyle;
};

export let style = StyleSheet.create<SpellFactorRowStyle>({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  label: {
    maxWidth: '80%',
  },
  level: {
    minWidth: 60,
  },
});
