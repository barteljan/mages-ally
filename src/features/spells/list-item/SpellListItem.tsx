import React from 'react';
import {Text, View} from 'react-native';
import {Surface, withTheme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../../../components/DynamiclyStyledPureComponent';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SpellFactorSectionDescription} from '../edit/SpellFactorSection/SpellFactorSectionDescription';
import {spellShortSummary} from '../../../rules/spells/spellSummary';
import {SpellInformation} from '../edit/SpellInformation/SpellInformation';
import {
  SpellListItemStyles,
  makeSpellListItemStyles,
} from './SpellListItem.styles';
import {SpellListItemProps} from './SpellListItem.props';

export class _SpellListItem extends DynamiclyStyledPureComponent<
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
        <Surface style={this.state.styles.surface}>
          <TouchableWithoutFeedback
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
                labelStyle={
                  this.state.styles.spellFactorSectionDescriptionLabel
                }
                showDices={false}
              />
            </View>
            <SpellInformation
              spell={this.props.item.spell}
              containerStyle={this.state.styles.spellInformationContainer}
              textStyle={this.state.styles.spellInformationText}
            />
          </TouchableWithoutFeedback>
        </Surface>
      </View>
    );
  }
}

export const SpellListItem = withTheme(_SpellListItem);
