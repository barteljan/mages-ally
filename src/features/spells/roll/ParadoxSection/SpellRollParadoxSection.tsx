import React, {PureComponent} from 'react';
import {
  SpellRollScreenStyle,
  makeSpellRollScreenStyle,
} from '../SpellRoll.styles';
import {withTheme} from 'react-native-paper';
import {Platform, UIManager} from 'react-native';
import {localization} from '../../Spell.strings';
import {SpellValueIds} from '../../../../rules/spells/spell-values/SpellValueIds';
import {labelForSleeperWittness} from '../../../../rules/spells/paradox/Paradox.strings';
import {SleeperWitnesses} from '../../../../rules/spells/paradox/SleeperWitnesses';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {ParadoxSectionDescription} from '../../edit/ParadoxSection/ParadoxSectionDescription';

import {makeNumberPickerRowItem} from '../../../../components/Form/NumberPickerRow';
import {makeTextOptionsRowItem} from '../../../../components/Form/TextOptionsRow';
import {Form, FormRowItem} from '../../../../components/Form/Form';
import {SpellRollParadoxSectionProps} from './SpellRollParadoxSection.props';

class _SpellRollParadoxSection extends PureComponent<
  SpellRollParadoxSectionProps
> {
  constructor(props: SpellRollParadoxSectionProps) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  makeStyle(): SpellRollScreenStyle {
    return makeSpellRollScreenStyle(this.props.theme);
  }

  render = () => {
    const config = this.props.config;
    const paradox = config.paradox;
    const parent = config.id;

    const paradoxSectionFormItems: FormRowItem[] = [
      makeNumberPickerRowItem(
        SpellValueIds.numberOfPreviousParadoxRolls,
        localization.previous_paradox_rolls_singular,
        localization.previous_paradox_rolls_plural,
        {
          parent,
          value: paradox.previousParadoxRolls,
          label: localization.previous_paradox_rolls_title,
        },
      ),
      makeNumberPickerRowItem(
        SpellValueIds.additionalManaSpendForReducingParadox,
        localization.additional_mana_spend_singular,
        localization.additional_mana_spend_plural,
        {
          parent,
          value: paradox.manaSpent,
          label: localization.additional_mana_spend_title,
        },
      ),
      makeTextOptionsRowItem(
        SpellValueIds.sleeperWitnesses,
        [
          SleeperWitnesses.none,
          SleeperWitnesses.one,
          SleeperWitnesses.few,
          SleeperWitnesses.largeGroup,
          SleeperWitnesses.fullCrowd,
        ],
        [
          labelForSleeperWittness(SleeperWitnesses.none),
          labelForSleeperWittness(SleeperWitnesses.one),
          labelForSleeperWittness(SleeperWitnesses.few),
          labelForSleeperWittness(SleeperWitnesses.largeGroup),
          labelForSleeperWittness(SleeperWitnesses.fullCrowd),
        ],
        {
          parent,
          value: paradox.sleeperWitnesses,
          label: localization.witnesses_title,
        },
      ),
    ];

    return (
      <FormSection
        identifier={'paradox'}
        title={(identifier, collapsed) => (
          <FormSectionTitle
            title={localization.paradox_section_title}
            iconName="bomb"
            collapsed={collapsed}
            description={
              <ParadoxSectionDescription
                spellCastingConfig={config}
                theme={this.props.theme}
              />
            }
          />
        )}
        containerStyles={this.props.containerStyles}
        collapsed={this.props.collapsed}
        onChangeCollapse={this.props.onChangeCollapse}>
        <Form
          identifier={'paradox'}
          rows={paradoxSectionFormItems}
          theme={this.props.theme}
          onChangeBoolean={this.props.setBooleanValue}
          onChangeNumber={this.props.setValue}
          onChangeString={this.props.setStringValue}
        />
      </FormSection>
    );
  };
}

export const SpellRollParadoxSection = withTheme(_SpellRollParadoxSection);
