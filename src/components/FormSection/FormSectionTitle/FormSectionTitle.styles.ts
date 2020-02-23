import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  container: {paddingBottom: 10},
  titleRow: {
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: 16,
  },
  collapser: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
