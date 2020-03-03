import React, {PureComponent, Ref} from 'react';
import {RollDiceProps} from './RollDice.props';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {RollDiceStyle, makeRollDiceStyle} from './RollDice.style';
import {localization} from './RollDice.strings';
import {DiceSelect} from '../../components/DiceSelect/DiceSelect';
import {getLayoutWidth, LayoutWidth} from '../../helper/layoutWidhtClasses';
import {ScrollView} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {withTheme} from 'react-native-paper';
import {isEqual} from 'lodash';
import {InputContainer} from '../../components/InputContainer/InputContainer';
import {FormButton} from '../../components/FormButton/FormButton';
import {RollItem} from '../rolls/list-item/RollItem';
import {DiceView} from '../../components/DiceView/DiceView';

type AddRollState = {
  styles: RollDiceStyle;
  size: LayoutRectangle;
};

class _RollDiceScreen extends PureComponent<RollDiceProps, AddRollState> {
  state = {
    styles: this.makeStyle(),
    size: {x: 0, y: 0, width: 0, height: 0},
  };

  scrollView: Ref<ScrollView> | undefined;

  constructor(props: RollDiceProps) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={this.state.styles.headerIconContainer}>
          <DiceView
            theme={this.props.theme}
            index={1}
            onPress={this.onRollDice}
            scale={0.5}
            activeOpacity={0.5}
          />
        </View>
      ),
    });
  }

  componentDidUpdate(prevProps: RollDiceProps) {
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles});
    }

    if (prevProps.currentRoll !== this.props.currentRoll) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }

  componentWillUnmount() {
    this.onHideRoll();
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
    if (this.scrollView) {
      //@ts-ignore
      this.scrollView.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  onHideRoll = () =>
    this.props.currentRoll
      ? this.props.clearCurrentRoll(this.props.currentRoll)
      : '';

  scrollViewRef = (ref: any) => (this.scrollView = ref);

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
        ? {} //{paddingHorizontal: 0}
        : {};

    const scale =
      this.state &&
      this.state.size &&
      getLayoutWidth(this.state.size) === LayoutWidth.small
        ? 0.75
        : 1.0;

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

    const buttonContainerHeight = 52 * 1.5;

    const item: Element | undefined = this.props.currentRoll ? (
      <RollItem
        item={this.props.currentRoll}
        onAction={this.onHideRoll}
        iconName="times"
        wrapperStyle={this.state.styles.diceRollWrapper}
        titleStyle={this.state.styles.diceRollTitle}
        scaleDice={0.65}
      />
    ) : (
      undefined
    );

    return (
      <ScrollView
        ref={this.scrollViewRef}
        style={[this.state.styles.container, containerStyle]}
        alwaysBounceVertical={false}
        onLayout={this.onLayoutChange}>
        {item}
        <View style={this.state.styles.containerContent}>
          <InputContainer
            title={localization.choose_dice}
            height="auto"
            containerStyle={this.state.styles.diceSelectContainer}>
            <DiceSelect
              numberOfDice={visibleNumberOfDice}
              value={this.props.numberOfDice}
              selectedColor={this.props.theme.colors.primary}
              selectedTextColor={this.props.theme.colors.background}
              unselectedTextColor={this.props.theme.colors.background}
              unselectedColor={this.props.theme.colors.disabled}
              groupStyle={groupStyle}
              onSelect={this.onSelectNumberOfDice}
              scale={scale}
            />
          </InputContainer>
          <FormButton
            parent={'no_parent'}
            theme={this.props.theme}
            title={localization.roll_dice_button_text}
            onPress={this.onRollDice}
            containerStyle={this.state.styles.rollDiceButtonStyle}
            actionComponent={
              <DiceView
                theme={this.props.theme}
                index={1}
                scale={0.5}
                activeOpacity={0.5}
                onPress={this.onRollDice}
                diceImageStyle={{tintColor: this.props.theme.colors.primary}}
              />
            }
          />
          <InputContainer
            title={localization.tenAgain_title}
            height={buttonContainerHeight}
            containerStyle={this.state.styles.inputContainer}>
            <ButtonGroup
              buttons={tenAgainButtons}
              selectedButtonStyle={this.state.styles.selectedButtonStyle}
              selectedIndex={tenAgainSelectedIndex}
              onPress={this.onChangeRollAgainType}
              underlayColor={this.props.theme.colors.primary}
            />
          </InputContainer>
          <InputContainer
            title={localization.exceptional_sucesses_title}
            height={buttonContainerHeight}
            containerStyle={this.state.styles.inputContainer}>
            <ButtonGroup
              buttons={exceptionalSuccessButtons}
              selectedButtonStyle={this.state.styles.selectedButtonStyle}
              selectedIndex={this.props.exceptionalSuccessAt - 1}
              onPress={this.onChangeExceptionalSuccess}
              underlayColor={this.props.theme.colors.primary}
            />
          </InputContainer>
        </View>
      </ScrollView>
    );
  }
}

export const RollDiceScreen = withTheme(_RollDiceScreen);
