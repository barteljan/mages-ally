import React from 'react';
import {ScrollView} from 'react-native';
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

class _EditSpellScreen extends DynamiclyStyledPureComponent<
  EditSpellProps,
  EditSpellsStyle
> {
  setValue = (identifier: string, value: number, parent: string) => {
    this.props.setValue(identifier, value, parent);
  };

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
    const parent = this.props.spellCastingConfig.id;

    const chosenArkanumTitle: string =
      arkanaLocalization[
        this.props.spellCastingConfig.caster.highestSpellArcanum.arcanumType
      ];

    return (
      <ScrollView
        style={[this.state.styles.container]}
        contentContainerStyle={this.state.styles.containerContent}
        alwaysBounceVertical={false}>
        <MageTextInput
          style={this.state.styles.inputField}
          identifier={SpellValueIds.title}
          parent={parent}
          value={this.props.spellCastingConfig.title}
          label={localization.spell_title}
          onBlur={this.props.setStringValue}
        />
        <InputContainer
          title={localization.gnosis_title}
          containerStyle={this.state.styles.inputContainer}>
          <DotSelect
            key={CharacterValueId.gnosis + 'select'}
            parent={parent}
            value={this.props.spellCastingConfig.caster.gnosis.diceModifier}
            identifier={CharacterValueId.gnosis}
            didSelect={this.setValue}
            numberOfDots={10}
          />
        </InputContainer>
        <InputContainer
          title={localization.highest_arcanum_title}
          containerStyle={this.state.styles.inputContainer}>
          <ArcanaSwitch
            selected={
              this.props.spellCastingConfig.caster.highestSpellArcanum
                .arcanumType
            }
            onChangedTo={this.changedArcanum}
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
            value={
              this.props.spellCastingConfig.caster.highestSpellArcanum
                .diceModifier
            }
            identifier={SpellValueIds.highestArcanumValue}
            didSelect={this.setValue}
            numberOfDots={5}
          />
        </InputContainer>
        <MageSwitch
          parent={parent}
          identifier={SpellValueIds.isMagesHighestArcanum}
          value={
            this.props.spellCastingConfig.caster.highestSpellArcanum.highest
          }
          label={localization.is_arcanum_the_highest_acranum.replace(
            VariablePlaceholder.highestArcanum,
            chosenArkanumTitle,
          )}
          onValueChanged={this.props.setBooleanValue}
        />
      </ScrollView>
    );
  }
}

export const EditSpellScreen = withTheme(_EditSpellScreen);
