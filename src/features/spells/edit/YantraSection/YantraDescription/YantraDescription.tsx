import React from 'react';
import {Text, View} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../../../components/DynamiclyStyledPureComponent';
import {makeYantraDescriptionStyle} from './YantraDescription.style';
import {YantraDescriptionStyle} from './YantraDescription.style';
import {YantraDescriptionProps} from './YantraDescription.props';

export class YantraDescription extends DynamiclyStyledPureComponent<
  YantraDescriptionProps,
  YantraDescriptionStyle
> {
  makeStyle() {
    return makeYantraDescriptionStyle(this.props.theme);
  }

  render = () => {
    const style = this.state.styles;
    const config = this.props.spellCastingConfig;

    let yantraElements: Element[] = [];

    config.spell.yantras.forEach(yantra => {
      yantraElements.push(
        <View style={style.infoContainer} key={yantra.id + '_description'}>
          <Text style={style.label}>
            {yantra.name}: {yantra.diceModifier}
          </Text>
        </View>,
      );
    });

    return <View style={style.container}>{yantraElements}</View>;
  };
}
