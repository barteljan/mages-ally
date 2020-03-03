import React from 'react';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {YantraSectionProps} from './YantraSection.props';
import {localization} from '../../Spell.strings';
import {EditSpellSections} from '../EditSpell.sections';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {
  YantraSectionStyle,
  makeYantraSectionStyle,
} from './YantraSection.style';
import {FormButton} from '../../../../components/FormButton/FormButton';
import {LayoutAnimation, Platform, UIManager} from 'react-native';
import {YantraRow} from './YantraRow/YantraRow';
import {YantraDescription} from './YantraDescription/YantraDescription';

export class YantraSection extends DynamiclyStyledPureComponent<
  YantraSectionProps,
  YantraSectionStyle
> {
  makeStyle(): YantraSectionStyle {
    return makeYantraSectionStyle(this.props.theme);
  }

  constructor(props: YantraSectionProps) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidUpdate(prevProps: YantraSectionProps) {
    super.componentDidUpdate(prevProps);
    if (
      prevProps.spellCastingConfig.spell.yantras.length !==
      this.props.spellCastingConfig.spell.yantras.length
    ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }

  render() {
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const spellSpec = config.spell;
    const yantras = spellSpec.yantras;
    const spell = this.props.spell;

    const styles = this.props.styles;

    let yantraRows: Element[] = [];
    yantras.forEach(yantra => {
      yantraRows.push(
        <YantraRow
          key={yantra.id + '_yantra_row'}
          theme={this.props.theme}
          yantra={yantra}
          containerStyle={styles.inputContainer}
          parent={parent}
          deleteYantra={this.props.deleteYantra}
          setYantraValue={this.props.setYantraValue}
        />,
      );
    });

    let yantraButton =
      spell.maxYantras > spellSpec.yantras.length ? (
        <FormButton
          key={'AddYantraButton'}
          theme={this.props.theme}
          containerStyle={styles.inputContainer}
          parent={parent}
          title={localization.yantra_add_button_title}
          onPress={this.props.chooseYantra}
        />
      ) : null;

    return (
      <FormSection
        identifier={EditSpellSections.yantras}
        title={(identifier, collapsed) => (
          <FormSectionTitle
            title={localization.yantra_section_title}
            iconName="flask"
            collapsed={collapsed}
            description={
              <YantraDescription
                spellCastingConfig={this.props.spellCastingConfig}
                theme={this.props.theme}
              />
            }
          />
        )}
        containerStyles={styles.section}
        collapsed={this.props.collapsed}
        onChangeCollapse={this.props.onChangeCollapse}>
        {yantraButton}
        {yantraRows}
      </FormSection>
    );
  }
}
