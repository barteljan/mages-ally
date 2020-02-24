import React, {PureComponent} from 'react';
import {View, LayoutChangeEvent} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {SpellFactorLevel} from '../../../../../rules/spells/spell-factors/SpellFactor.level';
import {SpellFactorSelectionListItem} from './SpellFactorSelectionListItem';
import {SpellFactorSelectionListProps} from './SpellFactorSelectionList.props';
export class SpellFactorSelectionList extends PureComponent<
  SpellFactorSelectionListProps
> {
  onStringValueChange = (value: string) => {
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue)) {
      this.onValueChange(numberValue);
    }
  };
  onValueChange = (value: number) => {
    this.props.setSpellFactorValue(
      this.props.spellFactor.spellFactorType,
      value,
      this.props.parent,
    );
    this.props.close();
  };

  onLayout = (event: LayoutChangeEvent) => {
    this.props.onLayout(event.nativeEvent.layout);
  };

  render() {
    const props = this.props;
    const factor = props.spellFactor;
    let options: Element[] = [];
    let maxIndex = 1;
    if (factor.level === SpellFactorLevel.standard) {
      maxIndex = factor.maxStandardValue;
    } else {
      maxIndex = factor.maxAdvancedValue;
    }
    for (let i = 0; i < maxIndex; i++) {
      options.push(
        <SpellFactorSelectionListItem
          {...props}
          key={
            SpellFactorSelectionListItem + props.spellFactor.spellFactorType + i
          }
          value={i + 1}
          didSelectValue={this.onValueChange}
        />,
      );
    }
    return (
      <View onLayout={this.onLayout}>
        <RadioButton.Group
          value={factor.value + ''}
          onValueChange={this.onStringValueChange}>
          {options}
        </RadioButton.Group>
      </View>
    );
  }
}
