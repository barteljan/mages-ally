import React from 'react';
import {Text, View} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {
  SpellSectionDescriptionStyle,
  makeSpellSectionDescriptionStyle,
} from './SpellSectionDescription.styles';
import {SpellSectionDescriptionProps} from './SpellSectionDescription.props';
import {spellSummary} from '../../../../rules/spells/spellSummary';

export class SpellSectionDescription extends DynamiclyStyledPureComponent<
  SpellSectionDescriptionProps,
  SpellSectionDescriptionStyle
> {
  makeStyle() {
    return makeSpellSectionDescriptionStyle(this.props.theme);
  }

  render = () => {
    const config = this.props.spellCastingConfig;
    const style = this.state.styles;
    let summary = spellSummary(config);

    return (
      <View style={style.container}>
        <View style={style.infoContainer}>
          <Text style={style.label}>{summary}</Text>
        </View>
      </View>
    );
  };
}
