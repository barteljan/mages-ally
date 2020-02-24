import React, {PureComponent} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {spellFactorLabel} from '../../../../../rules/spells/spell-factors/SpellFactor.labels';
import {SpellFactorSelectionListItemProps} from './SpellFactorSelectionListItem.props';
import {SpellFactorSelectionListItemStyle} from './SpellFactorSelectionListItem.style';

export class SpellFactorSelectionListItem extends PureComponent<
  SpellFactorSelectionListItemProps
> {
  onSelect = () => {
    this.props.didSelectValue(this.props.value);
  };

  render() {
    const props = this.props;
    const factor = props.spellFactor;
    const label = spellFactorLabel(
      factor.spellFactorType,
      factor.level,
      props.value,
      props.gnosis,
      props.primaryFactor,
      props.highestArcanumValue,
    );
    return (
      <TouchableOpacity style={style.optionContainer} onPress={this.onSelect}>
        <Text style={style.optionLabel}>{label}</Text>
        <RadioButton value={props.value + ''} />
      </TouchableOpacity>
    );
  }
}

export const style = StyleSheet.create<SpellFactorSelectionListItemStyle>({
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  optionLabel: {maxWidth: '80%'},
});
