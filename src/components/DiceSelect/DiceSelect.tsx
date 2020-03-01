import React from 'react';
import {View} from 'react-native';
import {DiceSelectProps} from './DiceSelect.props';
import {DiceSelectState} from './DiceSelect.state';
import {diceSelectStyles} from './DiceSelect.styles';
import {DiceView} from '../DiceView/DiceView';
export class DiceSelect extends React.PureComponent<
  DiceSelectProps,
  DiceSelectState
> {
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({value: this.props.value});
  }
  componentDidUpdate(prevProps: DiceSelectProps) {
    if (
      !this.state ||
      !this.state.value ||
      (prevProps.value !== this.props.value &&
        this.props.value !== this.state.value)
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({value: this.props.value});
    }
  }
  render() {
    if (!this.props || !this.state) {
      return null;
    }
    let diceGroups: Element[] = [];
    let dice: Element[] = [];
    let i = 1;
    const scale = this.props.scale ? this.props.scale : 1;
    while (i <= this.props.numberOfDice) {
      dice.push(
        <DiceView
          index={i}
          key={i + '_dice'}
          diceTextStyle={
            this.state.value && this.state.value >= i
              ? {color: this.props.selectedTextColor}
              : {color: this.props.unselectedTextColor}
          }
          diceImageStyle={
            this.state.value && this.state.value >= i
              ? {tintColor: this.props.selectedColor}
              : {tintColor: this.props.unselectedColor}
          }
          onPress={(index: number) => {
            this.props.onSelect(index);
            this.setState({value: index});
          }}
          scale={scale}
        />,
      );
      if (i % 5 === 0) {
        const everySecondGroupBottomMargin =
          i % 10 === 0 ? {marginBottom: 20} : {};

        diceGroups.push(
          <View
            style={[
              diceSelectStyles.diceGroup,
              this.props.groupStyle,
              everySecondGroupBottomMargin,
            ]}
            key={i + '_group'}>
            {dice}
          </View>,
        );
        dice = [];
      }
      i++;
    }
    return (
      <View style={[diceSelectStyles.container, this.props.style]}>
        {diceGroups}
      </View>
    );
  }
}
