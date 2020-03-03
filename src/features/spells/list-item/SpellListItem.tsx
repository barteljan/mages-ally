import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Surface, withTheme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../../../components/DynamiclyStyledPureComponent';
import {SpellFactorSectionDescription} from '../edit/SpellFactorSection/SpellFactorSectionDescription';
import {spellShortSummary} from '../../../rules/spells/spellSummary';
import {SpellInformation} from '../edit/SpellInformation/SpellInformation';
import {
  SpellListItemStyles,
  makeSpellListItemStyles,
} from './SpellListItem.styles';
import {SpellListItemProps} from './SpellListItem.props';
import {DiceView} from '../../../components/DiceView/DiceView';

export class _SpellListItem extends DynamiclyStyledPureComponent<
  SpellListItemProps,
  SpellListItemStyles
> {
  makeStyle() {
    return makeSpellListItemStyles(
      this.props.theme,
      this.props.spellFactorStyle,
      this.props.hideDescription ? this.props.hideDescription : false,
    );
  }

  onListItemPress = () => this.props.showSpell(this.props.config.id);

  onActionPress = () => this.props.onAction(this.props.config.id);

  render() {
    const config = this.props.config;
    const labelText = spellShortSummary(config);

    const actionItem = this.props.actionItem ? (
      this.props.actionItem
    ) : (
      <DiceView
        theme={this.props.theme}
        index={1}
        scale={0.5}
        onPress={this.onActionPress}
      />
    );

    const description = this.props.hideDescription ? null : (
      <SpellFactorSectionDescription
        spellCastingConfig={config}
        theme={this.props.theme}
        labelStyle={this.state.styles.spellFactorSectionDescriptionLabel}
        showDices={false}
      />
    );

    return (
      <View style={[this.state.styles.wrapper, this.props.wrapperStyle]}>
        <Surface style={this.state.styles.surface}>
          <TouchableOpacity
            activeOpacity={1}
            style={this.state.styles.container}
            key={config.id + '_spell'}
            onPress={this.onListItemPress}>
            <View style={this.state.styles.titleRow}>
              <View style={this.state.styles.titleContainer}>
                <Text style={this.state.styles.title}>{config.title}</Text>
                <Text style={this.state.styles.subTitle}> - {labelText}</Text>
              </View>
              <TouchableOpacity
                style={this.state.styles.actionWrapper}
                onPress={this.onActionPress}>
                {actionItem}
              </TouchableOpacity>
            </View>
            <View style={this.state.styles.spellFactorContainer}>
              {description}
            </View>
            <SpellInformation
              spell={this.props.spell}
              containerStyle={this.state.styles.spellInformationContainer}
              textStyle={this.state.styles.spellInformationText}
            />
          </TouchableOpacity>
        </Surface>
      </View>
    );
  }
}

export const SpellListItem = withTheme(_SpellListItem);
