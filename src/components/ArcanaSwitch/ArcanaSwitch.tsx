import React, {PureComponent} from 'react';
import {ArcanaType} from '../../rules/spells/arcana/Arcana.type';
import {localization as arkanaLocalization} from '../../rules/spells/arcana/Arcana.strings';
import Picker from 'react-native-picker-select';
import {ArcanaSwitchProps} from './ArcanaSwitch.props';
import {styles} from './ArcanaSwitch.styles';

export class ArcanaSwitch extends PureComponent<ArcanaSwitchProps> {
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
          viewContainer: styles.viewContainer,
        }}
      />
    );
  }
}
