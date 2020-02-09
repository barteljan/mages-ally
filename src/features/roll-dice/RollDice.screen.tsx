import React from 'react';
import {RollDiceProps} from './RollDice.props';
import {Text, LayoutChangeEvent, LayoutRectangle} from 'react-native';
import {style} from './RollDice.style';
import {localization} from './RollDice.strings';
import {Colors} from '../../layout/Colors';
import {DiceSelect} from '../../components/DiceSelect/DiceSelect';
import {getLayoutWidth, LayoutWidth} from '../../helper/layoutWidhtClasses';
import {ScrollView} from 'react-native-gesture-handler';
import {ButtonGroup, Button, Divider} from 'react-native-elements';
import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';

interface AddRollState {
  size: LayoutRectangle;
}

export class RollDiceScreen extends React.PureComponent<
  RollDiceProps,
  AddRollState
> {
  onLayoutChange = (event: LayoutChangeEvent) => {
    if (event && event.nativeEvent && event.nativeEvent.layout) {
      this.setState({size: event.nativeEvent.layout});
    }
  };

  onSelectNumberOfDices = (dices: number) => {
    this.props.setNumberOfDices(dices);
  };

  onChangeRollAgainType = (index: number) => {
    let type: DiceRollAgainType;

    switch (index) {
      case 0:
        type = DiceRollAgainType.tenAgain;
        break;
      case 1:
        type = DiceRollAgainType.nineAgain;
        break;
      case 2:
        type = DiceRollAgainType.eightAgain;
        break;
      case 3:
        type = DiceRollAgainType.roteQuality;
        break;
      default:
        type = DiceRollAgainType.tenAgain;
        break;
    }

    this.props.setRollAgainType(type);
  };

  indexForRollAgainType = (type: DiceRollAgainType): number => {
    switch (type) {
      case DiceRollAgainType.tenAgain:
        return 0;
      case DiceRollAgainType.nineAgain:
        return 1;
      case DiceRollAgainType.eightAgain:
        return 2;
      case DiceRollAgainType.roteQuality:
        return 3;
    }
  };

  onChangeExceptionalSuccess = (index: number) => {
    this.props.setExceptionalSuccessAt(index + 1);
  };

  onRollDice = () => {
    this.props.rollDice();
  };

  render() {
    //show always a 5 dice grouping and always 5 more than actually selected
    let visibleNumberOfDices = 10;

    if (this.props.numberOfDices > 8) {
      visibleNumberOfDices = 20;
    }

    const containerStyle =
      this.state &&
      this.state.size &&
      getLayoutWidth(this.state.size) === LayoutWidth.small
        ? {paddingHorizontal: 0}
        : {};

    const groupStyle =
      this.state &&
      this.state.size &&
      getLayoutWidth(this.state.size) !== LayoutWidth.large
        ? {width: '100%'}
        : {};

    const tenAgainButtons = [
      localization.tenAgain,
      localization.nineAgain,
      localization.eightAgain,
      localization.roteQuality,
    ];
    const tenAgainSelectedIndex = this.indexForRollAgainType(
      this.props.rollAgainType,
    );

    const exceptionalSuccessButtons = ['1', '2', '3', '4', '5'];

    return (
      <ScrollView
        style={[style.container, containerStyle]}
        contentContainerStyle={style.containerContent}
        alwaysBounceVertical={false}
        onLayout={this.onLayoutChange}>
        <Text style={style.title}>
          {localization.choose_dices.toUpperCase()}
        </Text>
        <DiceSelect
          numberOfDices={visibleNumberOfDices}
          value={this.props.numberOfDices}
          selectedColor={Colors.accentColor}
          unselectedColor={Colors.disabled}
          groupStyle={groupStyle}
          onSelect={this.onSelectNumberOfDices}
        />
        <Button
          containerStyle={style.rollDicesButtonStyle}
          title={localization.roll_dices_button_text}
          type="clear"
          titleStyle={style.rollDicesButtonTextStyle}
          onPress={this.onRollDice}
        />
        <Divider />
        <Text style={style.optionsTitle}>
          {localization.tenAgain_title.toUpperCase()}
        </Text>
        <ButtonGroup
          buttons={tenAgainButtons}
          selectedButtonStyle={style.selectedButtonStyle}
          selectedIndex={tenAgainSelectedIndex}
          onPress={this.onChangeRollAgainType}
          underlayColor={Colors.accentColor}
          containerStyle={style.buttonGroupStyle}
        />
        <Text style={style.optionsTitle}>
          {localization.exceptional_sucesses_title.toUpperCase()}
        </Text>
        <ButtonGroup
          buttons={exceptionalSuccessButtons}
          selectedButtonStyle={style.selectedButtonStyle}
          selectedIndex={this.props.exceptionalSuccessAt - 1}
          onPress={this.onChangeExceptionalSuccess}
          underlayColor={Colors.accentColor}
          containerStyle={style.buttonGroupStyle}
        />
      </ScrollView>
    );
  }
}
