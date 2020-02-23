import React, {PureComponent} from 'react';
import {ScrollView, LayoutAnimation} from 'react-native';
import {EditSpellProps} from './EditSpell.props';
import {EditSpellsStyle, makeEditSpellStyles} from './EditSpell.styles';
import {localization} from './EditSpell.strings';
import {SpellValueIds} from '../../../rules/spells/spell-values/SpellValueIds';
import {InputContainer} from '../../../components/InputContainer/InputContainer';
import {MageTextInput} from '../../../components/MageTextInput/MageTextInput';
import {ArcanaType} from '../../../rules/spells/arcana/Arcana.type';
import {withTheme} from 'react-native-paper';
import {ArcanaSwitch} from '../../../components/ArcanaSwitch/ArcanaSwitch';
import {isEqual} from 'lodash';
import {CasterSection} from './CasterSection/CasterSection';
import {EditSpellSections} from './EditSpell.sections';
import {SpellSection} from './SpellSection/SpellSection';
import {SpellFactorSection} from './SpellFactorSection/SpellFactorSection';

type EditSpellScreenState = {
  styles: EditSpellsStyle;
  openedSection: EditSpellSections | null;
};

class _EditSpellScreen extends PureComponent<
  EditSpellProps,
  EditSpellScreenState
> {
  state = {
    styles: this.makeStyle(),
    openedSection: null,
  };

  componentDidUpdate(
    prevProps: EditSpellProps,
    prevState: EditSpellScreenState,
  ) {
    const styles = this.makeStyle();
    if (!isEqual(styles, this.state.styles)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles});
    }

    if (this.state.openedSection !== prevState.openedSection) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }

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

  toggleSection = (section: EditSpellSections | null) =>
    section === this.state.openedSection
      ? this.setState({
          openedSection: null,
        })
      : this.setState({
          openedSection: section,
        });

  toggleCasterSection = () => this.toggleSection(EditSpellSections.caster);
  toggleSpellSection = () => this.toggleSection(EditSpellSections.spell);
  toggleSpellFactorSection = () =>
    this.toggleSection(EditSpellSections.spellFactor);

  render() {
    const styles = this.state.styles;

    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const caster = config.caster;

    //const chosenArkanumTitle: string = arkanaLocalization[caster.highestSpellArcanum.arcanumType];

    return (
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.containerContent}
        alwaysBounceVertical={false}>
        <MageTextInput
          style={styles.inputField}
          identifier={SpellValueIds.title}
          parent={parent}
          value={config.title}
          label={localization.spell_title}
          onBlur={this.props.setStringValue}
        />
        <InputContainer
          title={localization.highest_arcanum_title}
          containerStyle={styles.inputContainer}>
          <ArcanaSwitch
            selected={caster.highestSpellArcanum.arcanumType}
            onChangedTo={this.changedArcanum}
          />
        </InputContainer>
        <CasterSection
          {...this.props}
          collapsed={this.state.openedSection !== EditSpellSections.caster}
          onChangeCollapse={this.toggleCasterSection}
          styles={styles}
        />
        <SpellSection
          {...this.props}
          collapsed={this.state.openedSection !== EditSpellSections.spell}
          onChangeCollapse={this.toggleSpellSection}
          styles={styles}
        />
        <SpellFactorSection
          {...this.props}
          collapsed={this.state.openedSection !== EditSpellSections.spellFactor}
          onChangeCollapse={this.toggleSpellFactorSection}
          styles={styles}
        />
      </ScrollView>
    );
  }
}

export const EditSpellScreen = withTheme(_EditSpellScreen);
