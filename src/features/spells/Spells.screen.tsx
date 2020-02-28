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
import {SpellFactorSectionDescription} from './edit/SpellFactorSection/SpellFactorSectionDescription';
import {spellShortSummary} from '../../rules/spells/spellSummary';
import {SpellInformation} from './edit/SpellInformation/SpellInformation';

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

type SpellListItemStyles = {
  wrapper: ViewStyle;
  container: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  subTitle: TextStyle;
  spellFactorContainer: ViewStyle;
};

const makeSpellListItemStyles = (theme: Theme): SpellListItemStyles => {
  return {
    wrapper: {
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    container: {
      borderWidth: 1,
      borderColor: theme.colors.disabled,
      borderRadius: 3,
    },
    titleContainer: {
      paddingTop: 15,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 2,
      backgroundColor: theme.colors.background,
      flexWrap: 'wrap',
      paddingHorizontal: 15,
    },
    title: {
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: 'bold',
    },
    subTitle: {
      marginTop: 3,
      fontSize: 12,
      color: theme.colors.disabled,
    },
    spellFactorContainer: {
      backgroundColor: theme.colors.background,
      paddingBottom: 20,
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
    const labelText = spellShortSummary(config);
    return (
      <View style={this.state.styles.wrapper}>
        <TouchableOpacity
          style={this.state.styles.container}
          key={config.id + '_spell'}
          onPress={this.onPress}>
          <View style={this.state.styles.titleContainer}>
            <Text style={this.state.styles.title}>{config.title}</Text>
            <Text style={this.state.styles.subTitle}> - {labelText}</Text>
          </View>
          <View style={this.state.styles.spellFactorContainer}>
            <SpellFactorSectionDescription
              spellCastingConfig={config}
              theme={this.props.theme}
              labelStyle={{fontSize: 14}}
            />
          </View>
          <SpellInformation
            spell={this.props.item.spell}
            containerStyle={{paddingVertical: 5}}
            textStyle={{fontSize: 11}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const SpellListItem = withTheme(_SpellListItem);
