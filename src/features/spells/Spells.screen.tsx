import React from 'react';
import {
  Text,
  View,
  Platform,
  FlatList,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {SpellsStyle, makeSpellsStyle} from './Spells.styles';
import AddButton from './add-button/SpellsAddButton.container';
import {withTheme, Theme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../../components/DynamiclyStyledPureComponent';
import {SpellsProps} from './Spells.props';
import {SpellState} from './Spell.redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

class _SpellsScreen extends DynamiclyStyledPureComponent<
  SpellsProps,
  SpellsStyle
> {
  makeStyle() {
    return makeSpellsStyle(this.props.theme);
  }

  keyExtractor = (item: SpellState) => item.spellCastingConfig.id;

  renderItem = (elem: {item: SpellState}) => (
    <SpellListItem item={elem.item} showSpell={this.props.showSpell} />
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

type SpellListItemProps = {
  theme: Theme;
  item: SpellState;
  showSpell: (id: string) => void;
};

type SpellListItemStyles = {container: ViewStyle; title: TextStyle};

const makeSpellListItemStyles = (theme: Theme): SpellListItemStyles => {
  return {
    container: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderColor: '#cccccc',
    },
    title: {
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: 'bold',
    },
  };
};

class _SpellListItem extends DynamiclyStyledPureComponent<
  SpellListItemProps,
  SpellListItemStyles
> {
  makeStyle() {
    return makeSpellListItemStyles(this.props.theme);
  }

  onPress = () => this.props.showSpell(this.props.item.spellCastingConfig.id);

  render() {
    const config = this.props.item.spellCastingConfig;
    return (
      <TouchableOpacity
        style={this.state.styles.container}
        key={config.id + '_spell'}
        onPress={this.onPress}>
        <Text style={this.state.styles.title}>{config.title}</Text>
      </TouchableOpacity>
    );
  }
}

const SpellListItem = withTheme(_SpellListItem);
