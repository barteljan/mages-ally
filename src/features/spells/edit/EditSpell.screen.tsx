import React, {PureComponent} from 'react';
import {
  ScrollView,
  LayoutAnimation,
  View,
  Platform,
  UIManager,
} from 'react-native';
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
import {YantraSection} from './YantraSection/YantraSection';
import {SpellInformation} from './SpellInformation/SpellInformation';
import {ParadoxSection} from './ParadoxSection/ParadoxSection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

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

  constructor(props: EditSpellProps) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

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

  save = () => this.props.save(this.props.spellCastingConfig.id);

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () =>
        this.props.showSave ? (
          <TouchableOpacity
            style={this.state.styles.saveButtonContainer}
            onPress={this.save}>
            <Icon
              name="save"
              size={28}
              color={this.props.theme.colors.primary}
              onPress={this.save}
            />
          </TouchableOpacity>
        ) : null,
    });
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
  toggleYantraSection = () => this.toggleSection(EditSpellSections.yantras);
  toggleParadoxSection = () => this.toggleSection(EditSpellSections.paradox);

  render() {
    const styles = this.state.styles;

    const config = this.props.spellCastingConfig;
    const spell = this.props.spell;
    const parent = config.id;
    const caster = config.caster;

    return (
      <View style={styles.container}>
        <SpellInformation spell={spell} />
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={styles.containerContent}
          alwaysBounceVertical={false}>
          <MageTextInput
            style={styles.inputField}
            identifier={SpellValueIds.title}
            parent={parent}
            value={config.title}
            label={localization.spell_title}
            onChangeText={this.props.setStringValue}
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
            collapsed={
              this.state.openedSection !== EditSpellSections.spellFactor
            }
            onChangeCollapse={this.toggleSpellFactorSection}
            styles={styles}
          />
          <YantraSection
            {...this.props}
            collapsed={this.state.openedSection !== EditSpellSections.yantras}
            onChangeCollapse={this.toggleYantraSection}
            styles={styles}
          />
          <ParadoxSection
            {...this.props}
            collapsed={this.state.openedSection !== EditSpellSections.paradox}
            onChangeCollapse={this.toggleParadoxSection}
            styles={styles}
          />
        </ScrollView>
      </View>
    );
  }
}

//@ts-ignore
export const EditSpellScreen = withTheme(_EditSpellScreen);
