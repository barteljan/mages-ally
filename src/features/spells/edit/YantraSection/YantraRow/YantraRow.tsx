import React from 'react';
import {DynamiclyStyledPureComponent} from '../../../../../components/DynamiclyStyledPureComponent';
import {View, Text} from 'react-native';
import {InputContainer} from '../../../../../components/InputContainer/InputContainer';
import {DotSelect} from '../../../../../components/DotSelect/DotSelect';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {makeYantraRowStyle} from './YantraRow.style';
import {YantraRowProps} from './YantraRow.props';
import {YantraRowStyle} from './YantraRow.style';
export class YantraRow extends DynamiclyStyledPureComponent<
  YantraRowProps,
  YantraRowStyle
> {
  makeStyle(): YantraRowStyle {
    return makeYantraRowStyle(this.props.theme, this.props.yantra);
  }
  delete = () => {
    if (this.props.deleteYantra) {
      this.props.deleteYantra(this.props.yantra.id, this.props.parent);
    }
  };

  changedValue = (identifier: string, value: number) => {
    if (this.props.yantra.fixedDice === false) {
      this.props.setYantraValue(this.props.yantra.id, value, this.props.parent);
    }
  };

  render() {
    const yantra = this.props.yantra;
    const theme = this.props.theme;
    const deleteIcon = this.props.deleteYantra ? (
      <Icon name="minus" size={18} color={theme.colors.primary} />
    ) : null;

    const selectOrTitle =
      yantra.fixedDice === true && yantra.diceModifier === 0 ? (
        <Text style={this.state.styles.titleStyle}>{yantra.name}</Text>
      ) : (
        <DotSelect
          parent={this.props.parent}
          numberOfDots={yantra.maxDice}
          identifier={yantra.id}
          value={yantra.diceModifier}
          dotSize={18}
          didSelect={this.changedValue}
          color={
            yantra.fixedDice === false
              ? theme.colors.onBackground
              : theme.colors.disabled
          }
        />
      );

    return (
      <View>
        <InputContainer
          title={yantra.name ? yantra.name : 'empty'}
          containerStyle={this.props.containerStyle}>
          <View style={this.state.styles.yantraContainer}>
            {selectOrTitle}
            <TouchableOpacity
              style={this.state.styles.deleteButton}
              onPress={this.delete}>
              {deleteIcon}
            </TouchableOpacity>
          </View>
        </InputContainer>
      </View>
    );
  }
}
