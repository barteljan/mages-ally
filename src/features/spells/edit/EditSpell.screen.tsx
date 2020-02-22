import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {EditSpellProps} from './EditSpell.props';
import {EditSpellsStyle, makeEditSpellStyles} from './EditSpell.styles';
import {localization, VariablePlaceholder} from './EditSpell.strings';
import {CharacterValueId} from '../../../rules/character/CharacterValue.id';
import {DotSelect} from '../../../components/DotSelect/DotSelect';
import {SpellValueIds} from '../../../rules/spells/spell-values/SpellValueIds';
import {InputContainer} from '../../../components/InputContainer/InputContainer';
import {MageTextInput} from '../../../components/MageTextInput/MageTextInput';
import {ArcanaType} from '../../../rules/spells/arcana/Arcana.type';
import {localization as arkanaLocalization} from '../../../rules/spells/arcana/Arcana.strings';
import {DynamiclyStyledPureComponent} from '../../../components/DynamiclyStyledPureComponent';
import {withTheme} from 'react-native-paper';
import {ArcanaSwitch} from '../../../components/ArcanaSwitch/ArcanaSwitch';
import {MageSwitch} from '../../../components/MageSwitch/MageSwitch';
import {NumberSwitch} from '../../../components/NumberSwitch/NumberSwitch';

class _EditSpellScreen extends DynamiclyStyledPureComponent<
  EditSpellProps,
  EditSpellsStyle
> {
  makeStyle() {
    return makeEditSpellStyles(this.props.theme);
  }

  changedArcanum = (type: ArcanaType) => {
    this.props.setStringValue(
      SpellValueIds.highestArcanum,
      type,
      this.props.spellCastingConfig.id,
    );
  };

  render() {
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const caster = config.caster;

    const chosenArkanumTitle: string =
      arkanaLocalization[caster.highestSpellArcanum.arcanumType];

    return (
      <ScrollView
        style={[this.state.styles.container]}
        contentContainerStyle={this.state.styles.containerContent}
        alwaysBounceVertical={false}>
        <MageTextInput
          style={this.state.styles.inputField}
          identifier={SpellValueIds.title}
          parent={parent}
          value={config.title}
          label={localization.spell_title}
          onBlur={this.props.setStringValue}
        />
        <InputContainer
          title={localization.highest_arcanum_title}
          containerStyle={this.state.styles.inputContainer}>
          <ArcanaSwitch
            selected={caster.highestSpellArcanum.arcanumType}
            onChangedTo={this.changedArcanum}
          />
        </InputContainer>
        <InputContainer
          title={localization.gnosis_title}
          containerStyle={this.state.styles.inputContainer}>
          <DotSelect
            key={CharacterValueId.gnosis + 'select'}
            parent={parent}
            value={caster.gnosis.diceModifier}
            identifier={CharacterValueId.gnosis}
            didSelect={this.props.setValue}
            numberOfDots={10}
          />
        </InputContainer>
        <InputContainer
          title={localization.highest_arcanum_value.replace(
            VariablePlaceholder.highestArcanum,
            chosenArkanumTitle,
          )}
          containerStyle={this.state.styles.inputContainer}>
          <DotSelect
            key={SpellValueIds.highestArcanumValue + 'select'}
            parent={parent}
            value={caster.highestSpellArcanum.diceModifier}
            identifier={SpellValueIds.highestArcanumValue}
            didSelect={this.props.setValue}
            numberOfDots={5}
          />
        </InputContainer>
        <MageSwitch
          parent={parent}
          containerStyle={this.state.styles.switch}
          identifier={SpellValueIds.isMagesHighestArcanum}
          value={caster.highestSpellArcanum.highest}
          label={localization.is_arcanum_the_highest_acranum.replace(
            VariablePlaceholder.highestArcanum,
            chosenArkanumTitle,
          )}
          onValueChanged={this.props.setBooleanValue}
        />
        <MageSwitch
          parent={parent}
          containerStyle={this.state.styles.switch}
          identifier={SpellValueIds.isMagesRulingArcanum}
          value={caster.highestSpellArcanum.rulingArcana}
          label={localization.is_ruling_arcanum.replace(
            VariablePlaceholder.highestArcanum,
            chosenArkanumTitle,
          )}
          onValueChanged={this.props.setBooleanValue}
        />
        <InputContainer
          title={localization.number_of_active_spells}
          containerStyle={this.state.styles.inputContainer}>
          <NumberSwitch
            key={SpellValueIds.activeSpells + 'select'}
            identifier={SpellValueIds.activeSpells}
            parent={parent}
            selected={caster.activeSpells}
            onChangedTo={this.props.setValue}
            minValue={0}
            maxValue={20}
            singularItemLabel={localization.number_of_active_spells_singular}
            pluralItemLabel={localization.number_of_active_spells_plural}
          />
        </InputContainer>
      </ScrollView>
    );
  }
}

export const EditSpellScreen = withTheme(_EditSpellScreen);

export const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
});
