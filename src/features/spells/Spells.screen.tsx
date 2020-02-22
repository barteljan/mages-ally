import React from 'react';
import {Text, View, Platform} from 'react-native';
import {styles} from './Spells.styles';
import AddButton from '../spells-add-button/SpellsAddButton.container';
import {Theme} from 'react-native-paper';
import {withTheme} from 'react-native-paper';

class _SpellsScreen extends React.PureComponent<{theme: Theme}> {
  render() {
    const button =
      Platform.OS === 'android' ? <AddButton theme={this.props.theme} /> : null;

    return (
      <View style={styles.container}>
        <Text>{'Spells'}</Text>
        {button}
      </View>
    );
  }
}

export const SpellsScreen = withTheme(_SpellsScreen);
