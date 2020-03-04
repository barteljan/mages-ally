import React from 'react';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {AttainmentsSectionProps} from './AttainmentsSection.props';
import {localization} from '../../Spell.strings';
import {EditSpellSections} from '../EditSpell.sections';
import {SpellValueIds} from '../../../../rules/spells/spell-values/SpellValueIds';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {
  makeAttainmentsSectionStyle,
  AttainmentsSectionStyle,
} from './AttainmentsSection.style';
import {AttainmentsSectionDescription} from './AttainmentsSectionDescription';
import {MageSwitch} from '../../../../components/MageSwitch/MageSwitch';

export class AttainmentsSection extends DynamiclyStyledPureComponent<
  AttainmentsSectionProps,
  AttainmentsSectionStyle
> {
  makeStyle(): AttainmentsSectionStyle {
    return makeAttainmentsSectionStyle(this.props.theme);
  }

  render() {
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const spell = config.spell;
    const styles = this.props.styles;

    return (
      <FormSection
        identifier={EditSpellSections.spell}
        title={(identifier, collapsed) => (
          <FormSectionTitle
            title={localization.attainment_section_title}
            iconName="graduation-cap"
            collapsed={collapsed}
            description={
              <AttainmentsSectionDescription
                spellCastingConfig={this.props.spellCastingConfig}
                theme={this.props.theme}
              />
            }
          />
        )}
        containerStyles={styles.section}
        collapsed={this.props.collapsed}
        onChangeCollapse={this.props.onChangeCollapse}>
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.symphaticRange}
          value={spell.additionalSpecs.sympatheticRange}
          label={localization.sympathetic_range_title}
          onValueChanged={this.props.setBooleanValue}
        />
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.temporalSympathy}
          value={spell.additionalSpecs.temporalSympathy}
          label={localization.temporal_sympathy_title}
          onValueChanged={this.props.setBooleanValue}
        />
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.timeInABottle}
          value={spell.additionalSpecs.timeInABottle}
          label={localization.time_in_a_bottle_title}
          onValueChanged={this.props.setBooleanValue}
        />
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.everywhere}
          value={spell.additionalSpecs.everywhere}
          label={localization.everywhere_title}
          onValueChanged={this.props.setBooleanValue}
        />
      </FormSection>
    );
  }
}
