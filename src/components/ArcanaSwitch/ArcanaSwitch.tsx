import React from 'react';
import {ArcanaType} from '../../rules/spells/arcana/Arcana.type';
import {localization as arkanaLocalization} from '../../rules/spells/arcana/Arcana.strings';
import Picker from 'react-native-picker-select';
import {ArcanaSwitchProps} from './ArcanaSwitch.props';
import {
  ArcanaSwitchStyles,
  makeArcanaSwitchStyles,
} from './ArcanaSwitch.styles';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {withTheme} from 'react-native-paper';

class _ArcanaSwitch extends DynamiclyStyledPureComponent<
  ArcanaSwitchProps,
  ArcanaSwitchStyles
> {
  makeStyle() {
    return makeArcanaSwitchStyles(this.props.theme);
  }

  onChangedTo = (type: ArcanaType) => {
    this.props.onChangedTo(type);
  };

  render() {
    let items: {
      label: string;
      value: ArcanaType;
    }[] = [];
    Object.keys(ArcanaType).forEach(type => {
      items.push({
        label: arkanaLocalization[type as ArcanaType],
        value: type as ArcanaType,
      });
    });
    return (
      <Picker
        items={items}
        value={this.props.selected}
        onValueChange={value => this.onChangedTo(value as ArcanaType)}
        style={{
          inputIOS: this.state.styles.inputIOS,
          viewContainer: this.state.styles.viewContainer,
        }}
      />
    );
  }
}

export const ArcanaSwitch = withTheme(_ArcanaSwitch);
