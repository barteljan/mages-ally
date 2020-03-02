import React, {PureComponent} from 'react';
import {View, Text, LayoutChangeEvent} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {MageTextInput} from '../../../../../components/MageTextInput/MageTextInput';
import {InputContainer} from '../../../../../components/InputContainer/InputContainer';
import {DotSelect} from '../../../../../components/DotSelect/DotSelect';

import {isEqual} from 'lodash';
import {localization} from '../../EditSpell.strings';
import {
  CustomYantraOverlayStyle,
  makeCustomYantraOverlayStyle,
} from './CustomYantraOverlay.style';
import {CustomYantraOverlayProps} from './CustomYantraOverlay.props';

type CustomOverlayState = {
  title: string | undefined;
  value: number;
  styles: CustomYantraOverlayStyle;
};

export class CustomYantraOverlay extends PureComponent<
  CustomYantraOverlayProps,
  CustomOverlayState
> {
  //@ts-ignore
  state = {
    styles: this.makeStyle(),
    title: 'Custom Yantra',
    value: 0,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(prevProps: CustomYantraOverlayProps) {
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles: styles});
    }
  }

  makeStyle() {
    return makeCustomYantraOverlayStyle(this.props.theme);
  }

  onLayout = (event: LayoutChangeEvent) => {
    this.props.onLayout(event.nativeEvent.layout);
  };

  onAdd = () => {
    this.props.add(this.state.title!, this.state.value);
  };

  onSetValue = (_: any, value: number) => {
    this.setState({value});
  };

  onChangeText = (_: string, text: string | undefined) => {
    this.setState({title: text});
  };

  render() {
    return (
      <Overlay
        isVisible={this.props.isVisible}
        height={this.props.height}
        supportedOrientations={['portrait', 'landscape']}
        onBackdropPress={this.props.cancle}
        width={300}>
        <View style={this.state.styles.container} onLayout={this.onLayout}>
          <Text style={this.state.styles.viewTitle}>
            {localization.add_custom_yantra_overlay_title}
          </Text>
          <MageTextInput
            identifier={'title'}
            label={localization.add_custom_yantra_overlay_title_field_title}
            onChangeText={this.onChangeText}
            onBlur={() => {}}
            parent={this.props.parent}
            value={this.state.title}
          />
          <InputContainer
            title={localization.add_custom_yantra_overlay_value_field_title}
            containerStyle={this.state.styles.valueContainer}>
            <DotSelect
              key={'customYantra'}
              parent={this.props.parent}
              value={this.state.value}
              identifier={'customYantra'}
              didSelect={this.onSetValue}
              numberOfDots={10}
              dotSize={18.5}
            />
          </InputContainer>
          <View style={this.state.styles.buttonContainer}>
            <Button
              mode="contained"
              compact={true}
              style={[this.state.styles.button]}
              labelStyle={this.state.styles.addButtonText}
              color={this.props.theme.colors.background}
              onPress={this.onAdd}>
              {localization.add_custom_yantra_overlay_add_button_text}
            </Button>
            <Button
              mode="outlined"
              compact={true}
              style={this.state.styles.button}
              labelStyle={this.state.styles.cancleButtonText}
              onPress={this.props.cancle}>
              {localization.add_custom_yantra_overlay_cancle_button_text}
            </Button>
          </View>
        </View>
      </Overlay>
    );
  }
}
