import React, {PureComponent} from 'react';
import {RollDiceProps} from './RollDice.props';
import {Text, LayoutChangeEvent, LayoutRectangle} from 'react-native';
import {RollDiceStyle, makeRollDiceStyle} from './RollDice.style';
import {localization} from './RollDice.strings';
import {DiceSelect} from '../../components/DiceSelect/DiceSelect';
import {getLayoutWidth, LayoutWidth} from '../../helper/layoutWidhtClasses';
import {ScrollView} from 'react-native-gesture-handler';
import {ButtonGroup, Button, Divider} from 'react-native-elements';
import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {withTheme} from 'react-native-paper';
import {isEqual} from 'lodash';

type AddRollState = {
  styles: RollDiceStyle;
  size: LayoutRectangle;
};

class _RollDiceScreen extends PureComponent<RollDiceProps, AddRollState> {
  state = {
    styles: this.makeStyle(),
    size: {x: 0, y: 0, width: 0, height: 0},
  };

  componentDidUpdate() {
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles});
    }
  }

  makeStyle() {
    return makeRollDiceStyle(this.props.theme);
  }

  onLayoutChange = (event: LayoutChangeEvent) => {
    if (event && event.nativeEvent && event.nativeEvent.layout) {
      this.setState({size: event.nativeEvent.layout});
    }
  };

  onSelectNumberOfDice = (dice: number) => {
    this.props.setNumberOfDice(dice);
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
    let visibleNumberOfDice = 10;

    if (this.props.numberOfDice > 8) {
      visibleNumberOfDice = 20;
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
        style={[this.state.styles.container, containerStyle]}
        contentContainerStyle={this.state.styles.containerContent}
        alwaysBounceVertical={false}
        onLayout={this.onLayoutChange}>
        <Text style={this.state.styles.title}>
          {localization.choose_dice.toUpperCase()}
        </Text>
        <DiceSelect
          numberOfDice={visibleNumberOfDice}
          value={this.props.numberOfDice}
          selectedColor={this.props.theme.colors.primary}
          selectedTextColor={this.props.theme.colors.background}
          unselectedTextColor={this.props.theme.colors.background}
          unselectedColor={this.props.theme.colors.disabled}
          groupStyle={groupStyle}
          onSelect={this.onSelectNumberOfDice}
        />
        <Button
          containerStyle={this.state.styles.rollDiceButtonStyle}
          title={localization.roll_dice_button_text}
          type="clear"
          titleStyle={this.state.styles.rollDiceButtonTextStyle}
          onPress={this.onRollDice}
        />
        <Divider />
        <Text style={this.state.styles.optionsTitle}>
          {localization.tenAgain_title.toUpperCase()}
        </Text>
        <ButtonGroup
          buttons={tenAgainButtons}
          selectedButtonStyle={this.state.styles.selectedButtonStyle}
          selectedIndex={tenAgainSelectedIndex}
          onPress={this.onChangeRollAgainType}
          underlayColor={this.props.theme.colors.primary}
          containerStyle={this.state.styles.buttonGroupStyle}
        />
        <Text style={this.state.styles.optionsTitle}>
          {localization.exceptional_sucesses_title.toUpperCase()}
        </Text>
        <ButtonGroup
          buttons={exceptionalSuccessButtons}
          selectedButtonStyle={this.state.styles.selectedButtonStyle}
          selectedIndex={this.props.exceptionalSuccessAt - 1}
          onPress={this.onChangeExceptionalSuccess}
          underlayColor={this.props.theme.colors.primary}
          containerStyle={this.state.styles.buttonGroupStyle}
        />
      </ScrollView>
    );
  }
}

export const RollDiceScreen = withTheme(_RollDiceScreen);
