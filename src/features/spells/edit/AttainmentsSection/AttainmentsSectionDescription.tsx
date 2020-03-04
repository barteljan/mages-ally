import React from 'react';
import {Text, View} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {
  AttainmentsSectionDescriptionStyle,
  makeAttainmentsSectionDescriptionStyle,
} from './AttainmentsSectionDescription.styles';
import {AttainmentsSectionDescriptionProps} from './AttainmentsSectionDescription.props';
import {localization} from '../../Spell.strings';

export class AttainmentsSectionDescription extends DynamiclyStyledPureComponent<
  AttainmentsSectionDescriptionProps,
  AttainmentsSectionDescriptionStyle
> {
  makeStyle() {
    return makeAttainmentsSectionDescriptionStyle(this.props.theme);
  }

  render = () => {
    const additionalSpecs = this.props.spellCastingConfig.spell.additionalSpecs;
    const style = this.state.styles;

    let attainmentStrings: string[] = [];

    if (additionalSpecs.everywhere) {
      attainmentStrings.push(localization.everywhere_title);
    }

    if (additionalSpecs.timeInABottle) {
      attainmentStrings.push(localization.time_in_a_bottle_title);
    }

    if (additionalSpecs.sympatheticRange) {
      attainmentStrings.push(localization.sympathetic_range_title);
    }

    if (additionalSpecs.temporalSympathy) {
      attainmentStrings.push(localization.sympathetic_range_title);
    }

    let items: Element[] = [];
    attainmentStrings.forEach(string => {
      items.push(
        <View style={style.infoContainer}>
          <Text style={style.label} key={string}>
            {string}
          </Text>
        </View>,
      );
    });

    return <View style={style.container}>{items}</View>;
  };
}
