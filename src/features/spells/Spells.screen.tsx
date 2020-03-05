import React from 'react';
import {Text, View, Platform, FlatList} from 'react-native';
import {SpellsStyle, makeSpellsStyle} from './Spells.styles';
import AddButton from './add-button/SpellsAddButton.container';
import {withTheme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../../components/DynamiclyStyledPureComponent';
import {SpellsProps} from './Spells.props';
import {SpellState} from './Spell.state';
import {SpellListItem} from './list-item/SpellListItem';

class _SpellsScreen extends DynamiclyStyledPureComponent<
  SpellsProps,
  SpellsStyle
> {
  makeStyle() {
    return makeSpellsStyle(this.props.theme);
  }

  keyExtractor = (item: SpellState) => item.spellCastingConfig.id;

  rollDice = (id: string) => {
    this.props.rollDice(id);
  };

  renderItem = (elem: {item: SpellState}) => (
    <SpellListItem
      config={elem.item.spellCastingConfig}
      spell={elem.item.spell}
      showSpell={this.props.showSpell}
      onAction={this.rollDice}
    />
  );

  render() {
    const button =
      Platform.OS === 'android' ? <AddButton theme={this.props.theme} /> : null;

    return (
      <View style={this.state.styles.container}>
        <FlatList
          style={this.state.styles.list}
          data={this.props.spells}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
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
