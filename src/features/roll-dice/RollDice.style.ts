import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {FontSize, Font} from '../../layout/Font';
import {Colors} from '../../layout/Colors';

interface RollDiceStyle {
  container: ViewStyle;
  containerContent: ViewStyle;
  title: TextStyle;
  optionsTitle: TextStyle;
  selectedButtonStyle: ViewStyle;
  buttonGroupStyle: ViewStyle;
  rollDicesButtonStyle: ViewStyle;
  rollDicesButtonTextStyle: TextStyle;
}

export const style = StyleSheet.create<RollDiceStyle>({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  containerContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: FontSize.header,
    fontFamily: Font.header,
    color: Colors.header,
    marginBottom: 15,
  },
  optionsTitle: {
    fontSize: FontSize.header,
    fontFamily: Font.header,
    color: Colors.header,
    marginBottom: 15,
  },
  selectedButtonStyle: {
    backgroundColor: Colors.accentColor,
  },
  buttonGroupStyle: {
    marginBottom: 30,
  },
  rollDicesButtonStyle: {
    marginBottom: 15,
  },
  rollDicesButtonTextStyle: {
    color: Colors.accentColor,
    fontFamily: Font.button,
    fontSize: FontSize.button,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
