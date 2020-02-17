import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {FontSize, Font} from '../../layout/Font';
import {Colors} from '../../layout/Colors';

type RollDiceStyle = {
  container: ViewStyle;
  containerContent: ViewStyle;
  title: TextStyle;
  optionsTitle: TextStyle;
  selectedButtonStyle: ViewStyle;
  buttonGroupStyle: ViewStyle;
  rollDiceButtonStyle: ViewStyle;
  rollDiceButtonTextStyle: TextStyle;
};

export const style = StyleSheet.create<RollDiceStyle>({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.backgroundColor,
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
  rollDiceButtonStyle: {
    marginBottom: 15,
  },
  rollDiceButtonTextStyle: {
    color: Colors.accentColor,
    fontFamily: Font.button,
    fontSize: FontSize.button,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
