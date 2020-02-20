import React, {PureComponent} from 'react';
import {ScrollView, Text} from 'react-native';
import {AddSpellProps} from './AddSpell.props';
import {styles} from './AddSpell.styles';
import {localization} from './AddSpell.strings';
import {CharacterValueId} from '../../rules/character/CharacterValue.id';
import {DotSelect} from '../../components/DotSelect/DotSelect';
import {SpellValueIds} from '../../rules/spells/spell-values/SpellValueIds';
import {InputContainer} from '../../components/InputContainer/InputContainer';
import {MageTextInput} from '../../components/MageTextInput/MageTextInput';
import {ArcanaType} from '../../rules/spells/arcana/Arcana.type';
import {localization as arkanaLocalization} from '../../rules/spells/arcana/Arcana.strings';

export class AddSpellScreen extends PureComponent<AddSpellProps> {
  setValue = (identifier: string, value: number) => {
    this.props.setValue(identifier, value);
  };

  render() {
    console.log('config', this.props.spellCastingConfig);
    return (
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.containerContent}
        alwaysBounceVertical={false}>
        <MageTextInput
          style={styles.inputField}
          identifier={SpellValueIds.title}
          value={this.props.spellCastingConfig.title}
          label={localization.spell_title}
          onBlur={this.props.setStringValue}
        />
        <InputContainer
          title={localization.gnosis_title}
          containerStyle={styles.inputContainer}>
          <DotSelect
            key={CharacterValueId.gnosis + 'select'}
            value={this.props.spellCastingConfig.caster.gnosis.diceModifier}
            identifier={CharacterValueId.gnosis}
            didSelect={this.setValue}
            numberOfDots={10}
          />
        </InputContainer>
        <InputContainer
          title={localization.highest_arcanum_title}
          containerStyle={styles.inputContainer}>
          <ArcanaSwitch
            selected={
              this.props.spellCastingConfig.caster.highestSpellArcanum
                .arcanumType
            }
          />
        </InputContainer>
      </ScrollView>
    );
  }
}

type ArcanaSwitchProps = {
  selected: ArcanaType;
};

class ArcanaSwitch extends PureComponent<ArcanaSwitchProps> {
  render = () => {
    let labels: string[] = [];

    Object.keys(ArcanaType).forEach(type => {
      labels.push(arkanaLocalization[type as ArcanaType]);
    });

    return <Text>{'test'}</Text>;
  };
}
