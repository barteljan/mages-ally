import React from 'react';
import {Text, View, Platform, FlatList} from 'react-native';
import {SpellsStyle, makeSpellsStyle} from './Spells.styles';
import AddButton from './add-button/SpellsAddButton.container';
import {Theme} from 'react-native-paper';
import {withTheme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../../components/DynamiclyStyledPureComponent';

type SpellsProps = {theme: Theme};

class _SpellsScreen extends DynamiclyStyledPureComponent<
  SpellsProps,
  SpellsStyle
> {
  makeStyle() {
    return makeSpellsStyle(this.props.theme);
  }

  render() {
    const button =
      Platform.OS === 'android' ? <AddButton theme={this.props.theme} /> : null;

    return (
      <View style={this.state.styles.container}>
        <FlatList
          style={this.state.styles.list}
          data={[]}
          renderItem={() => <View />}
          contentContainerStyle={this.state.styles.contentContainerStyle}
          ListEmptyComponent={
            <View style={this.state.styles.emptyComponentContainer}>
              <Text>No spells found!</Text>
            </View>
          }
        />
        {button}
      </View>
    );
  }
}

export const SpellsScreen = withTheme(_SpellsScreen);
