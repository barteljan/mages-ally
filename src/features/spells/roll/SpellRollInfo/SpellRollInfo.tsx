import React, {PureComponent} from 'react';
import {localization} from '../../Spell.strings';
import {ParadoxResolution} from '../../../../rules/spells/paradox/ParadoxResolution';
import {paradoxRollDescription} from '../../../../rules/spells/roll/paradoxRollDescription';
import {containParadoxRollDescription} from '../../../../rules/spells/roll/containParadoxRollDescription';
import {releaseParadoxRollDescription} from '../../../../rules/spells/roll/releaseParadoxRollDescription';
import {spellRollDescription} from '../../../../rules/spells/roll/spellRollDecription';
import {SpellRollContainer} from '../SpellRollContainer/SpellRollContainer';
import {SpellRollInfoProps} from './SpellRollInfo.props';
import {
  SpellRollInfoStyles,
  makeSpellRollInfoStyles,
} from './SpellRollInfo.styles';
import {View, Text, LayoutAnimation} from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import {isEqual} from 'lodash';

type SpellRollInfoState = {
  styles: SpellRollInfoStyles;
};

export class SpellRollInfo extends PureComponent<
  SpellRollInfoProps,
  SpellRollInfoState
> {
  state = {
    styles: this.makeStyle(),
  };

  componentDidUpdate(prevProps: SpellRollInfoProps) {
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles: styles});
    }

    if (prevProps && prevProps.collapsed !== this.props.collapsed) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }
  makeStyle() {
    return makeSpellRollInfoStyles(this.props.theme);
  }

  onSwitchCollapse = () => {
    this.props.onSetCollapse(!this.props.collapsed);
  };

  render() {
    const styles = this.state.styles;

    const paradoxRollContainer = this.props.spellInformationConfig
      .paradoxRoll ? (
      <SpellRollContainer
        title={paradoxRollDescription(
          this.props.spellInformationConfig.paradoxRoll,
        )}
        theme={this.props.theme}
        roll={this.props.spellInformationConfig.paradoxRoll}
        containerStyle={[styles.rollContainer, styles.paradoxRollContainer]}
      />
    ) : null;

    const containParadoxRollContainer = this.props.spellInformationConfig
      .containParadoxRoll ? (
      <SpellRollContainer
        title={containParadoxRollDescription(
          this.props.spellInformationConfig.containParadoxRoll,
          this.props.spellInformationConfig.paradoxRoll,
        )}
        theme={this.props.theme}
        roll={this.props.spellInformationConfig.containParadoxRoll}
        containerStyle={[
          styles.rollContainer,
          styles.containParadoxRollContainer,
        ]}
      />
    ) : null;

    const releaseParadoxContainer =
      this.props.spellInformationConfig.paradoxRoll &&
      this.props.spellInformationConfig.paradoxRoll.successes > 0 &&
      this.props.spellInformationConfig.spellRollConfig.paradoxResolution ===
        ParadoxResolution.release ? (
        <View style={[styles.rollContainer, styles.releaseParadoxContainer]}>
          <Markdown style={styles.releaseParadoxDescription}>
            {releaseParadoxRollDescription(
              this.props.spellInformationConfig.paradoxRoll,
              this.props.spellInformationConfig.wisdom,
            )}
          </Markdown>
        </View>
      ) : null;

    const spellRollContainer = (
      <SpellRollContainer
        title={spellRollDescription(
          this.props.spellInformationConfig.spellRoll,
          this.props.spellInformationConfig.title,
        )}
        theme={this.props.theme}
        roll={this.props.spellInformationConfig.spellRoll}
        containerStyle={[styles.rollContainer, styles.spellRollContainer]}
      />
    );

    const title = this.props.spellInformationConfig.title;
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {localization.spell_roll_info_title_prefix}
                {title ? ' "' + title + '"' : ''}
              </Text>
            </View>
          </View>

          {!this.props.collapsed ? paradoxRollContainer : null}
          {!this.props.collapsed ? containParadoxRollContainer : null}
          {!this.props.collapsed ? releaseParadoxContainer : null}
          {!this.props.collapsed ? spellRollContainer : null}
        </View>
      </View>
    );
  }
}
