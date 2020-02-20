import {StyleSheet} from 'react-native';
import {Colors} from '../../layout/Colors';
import {FontSize, Font} from '../../layout/Font';

export const styles = StyleSheet.create({
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
  inputField: {
    height: 52,
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
