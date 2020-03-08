import React from 'react';
import {Text, View, Platform, LayoutAnimation, UIManager} from 'react-native';
import {SpellsStyle, makeSpellsStyle} from './Spells.styles';
import AddButton from './add-button/SpellsAddButton.container';
import {withTheme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../../components/DynamiclyStyledPureComponent';
import {SpellsProps} from './Spells.props';
import {SpellState} from './Spell.state';
import {SpellListItem} from './list-item/SpellListItem';
import {SwipeListView} from 'react-native-swipe-list-view';
import {DeleteItem} from '../../components/DeleteItem/DeleteItem';

class _SpellsScreen extends DynamiclyStyledPureComponent<
  SpellsProps,
  SpellsStyle
> {
  constructor(props: SpellsProps) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  makeStyle() {
    return makeSpellsStyle(this.props.theme);
  }

  keyExtractor = (item: SpellState) => item.spellCastingConfig.id;

  rollDice = (id: string) => {
    this.props.rollDice(id);
  };

  componentDidUpdate(prevProps: SpellsProps) {
    super.componentDidUpdate(prevProps);

    if (prevProps.spells.length !== this.props.spells.length) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }

  renderItem = (elem: {item: SpellState}) => (
    <SpellListItem
      config={elem.item.spellCastingConfig}
      spell={elem.item.spell}
      showSpell={this.props.showSpell}
      onAction={this.rollDice}
    />
  );

  onDelete = (item: SpellState) => {
    this.props.delete(item.spellCastingConfig.id);
  };

  renderHiddenItem = (data: {item: SpellState}) => {
    return (
      <DeleteItem
        delete={this.props.delete}
        theme={this.props.theme}
        id={data.item.spellCastingConfig.id}
        containerStyle={this.state.styles.swipeBackground}
      />
    );
  };

  render() {
    const button =
      Platform.OS === 'android' ? <AddButton theme={this.props.theme} /> : null;

    const styles = this.state.styles;

    return (
      <View style={styles.container}>
        <SwipeListView<SpellState>
          style={styles.list}
          data={this.props.spells}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          renderHiddenItem={this.renderHiddenItem}
          ListEmptyComponent={
            <View style={styles.emptyComponentContainer}>
              <Text>No spells found!</Text>
            </View>
          }
          rightOpenValue={-75}
          disableRightSwipe={true}
          closeOnRowPress={true}
          closeOnRowOpen={true}
        />
        {button}
      </View>
    );
  }
}

export const SpellsScreen = withTheme(_SpellsScreen);
