import {StyleSheet} from 'react-native';
import {Colors} from '../../../layout/Colors';
import {FontSize} from '../../../layout/Font';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopColor: Colors.seperator,
    borderTopWidth: 1,
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
  },
  skullItem: {
    backgroundColor: Colors.complementColor,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  subtitle: {
    marginTop: 5,
    fontSize: FontSize.small,
  },
  rightSubtitle: {
    fontSize: FontSize.small,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    textAlignVertical: 'top',
    textAlign: 'left',
    flex: 1,
    width: 72,
  },
  success: {
    color: Colors.accentColor,
  },
  failure: {
    color: Colors.complementColor,
  },
});
