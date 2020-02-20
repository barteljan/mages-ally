import {ViewStyle, StyleSheet} from 'react-native';
import {Colors} from '../../layout/Colors';
export type InputContainerStyle = {
  container: ViewStyle;
  label: ViewStyle;
};

export const style = StyleSheet.create<InputContainerStyle>({
  container: {
    width: '100%',
    justifyContent: 'center',
    height: 52,
    borderStyle: 'solid',
    borderColor: Colors.disabled,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: '#efefef',
  },
  label: {
    color: Colors.disabled,
    position: 'absolute',
    left: 10,
    top: -8,
    fontSize: 11,
    paddingHorizontal: 3,
    paddingVertical: 0,
    backgroundColor: Colors.backgroundColor,
  },
});
