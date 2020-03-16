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
import {localization} from '../Spell.strings';
import {SpellValueIds} from '../../../rules/spells/spell-values/SpellValueIds';
import {ArcanaType} from '../../../rules/spells/arcana/Arcana.type';
import {withTheme} from 'react-native-paper';
import {isEqual} from 'lodash';
import {CasterSection} from './CasterSection/CasterSection';
import {EditSpellSections} from './EditSpell.sections';
import {SpellSection} from './SpellSection/SpellSection';
import {SpellFactorSection} from './SpellFactorSection/SpellFactorSection';
import {YantraSection} from './YantraSection/YantraSection';
import {SpellInformation} from './SpellInformation/SpellInformation';
import {ParadoxSection} from './ParadoxSection/ParadoxSection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native';
import {AttainmentsSection} from './AttainmentsSection/AttainmentsSection';
import {FormRowItem, Form} from '../../../components/Form/Form';
import {makeArkanaSwitchRow} from '../../../components/ArcanaSwitch/makeArcanaSwitchRow';
import {makeTextInputRowItem} from '../../../components/Form/TextInputRow';

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

  onRollDice = () => this.props.rollDice(this.props.spellCastingConfig.id);

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
        ) : (
          <View style={this.state.styles.saveButtonContainer}>
            <FontawesomeIcon
              name="magic"
              size={18}
              color={this.props.theme.colors.primary}
              onPress={this.onRollDice}
            />
          </View>
        ),
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
  toggleAttainmentsSection = () =>
    this.toggleSection(EditSpellSections.attainments);

  render() {
    const styles = this.state.styles;

    const config = this.props.spellCastingConfig;
    const spell = this.props.spell;
    const parent = config.id;
    const caster = config.caster;

    let formItems: FormRowItem[] = [
      makeTextInputRowItem(SpellValueIds.title, {
        parent,
        value: config.title,
        label: localization.spell_title,
      }),
      makeArkanaSwitchRow(
        SpellValueIds.highestArcanum,
        parent,
        localization.highest_arcanum_title,
        caster.highestSpellArcanum.arcanumType,
      ),
    ];

    return (
      <View style={styles.container}>
        <SpellInformation spell={spell} />
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={styles.containerContent}
          alwaysBounceVertical={false}>
          <Form
            identifier={'edit_spell'}
            rows={formItems}
            theme={this.props.theme}
            containerStyle={this.state.styles.form}
            onChangeBoolean={this.props.setBooleanValue}
            onChangeNumber={this.props.setValue}
            onChangeString={this.props.setStringValue}
          />
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
          <AttainmentsSection
            {...this.props}
            collapsed={
              this.state.openedSection !== EditSpellSections.attainments
            }
            onChangeCollapse={this.toggleAttainmentsSection}
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
