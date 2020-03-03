import React, {PureComponent} from 'react';
import {YantraSelectRow} from './YantraSelectRow/YantraSelectRow';
import {
  ChooseYantraScreenStyle,
  makeChooseYantraScreenStyle,
} from './ChooseYantra.styles';
import {ChooseYantraScreenProps} from './ChooseYantra.props';
import {withTheme} from 'react-native-paper';
import {
  View,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  LayoutRectangle,
} from 'react-native';
import {Yantra} from '../../../../rules/spells/yantra/yantra';
import {ChooseYantraGroupHeader} from './ChooseYantraGroupHeader/ChooseYantraGroupHeader';
import {FormButton} from '../../../../components/FormButton/FormButton';
import {localization} from '../../Spell.strings';
import {CustomYantraOverlay} from './CustomYantraOverlay/CustomYantraOverlay';
import {isEqual} from 'lodash';

type YantraScreenState = {
  styles: ChooseYantraScreenStyle;
  overlayVisible: boolean;
  overlayHeight: number;
};

class _ChooseYantraScreen extends PureComponent<
  ChooseYantraScreenProps,
  YantraScreenState
> {
  //@ts-ignore
  state = {
    styles: this.makeStyle(),
    overlayVisible: false,
    overlayHeight: 100,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(prevProps: ChooseYantraScreenProps) {
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles: styles});
    }
  }

  makeStyle(): ChooseYantraScreenStyle {
    return makeChooseYantraScreenStyle(this.props.theme);
  }

  onSelectYantra = (yantra: Yantra) =>
    this.props.didSelectYantra(yantra, this.props.parent);

  renderItem = (info: SectionListRenderItemInfo<Yantra>) => {
    const item = info.item as Yantra;
    return (
      <YantraSelectRow
        yantra={item}
        theme={this.props.theme}
        didSelectYantra={this.onSelectYantra}
        lastRowInSection={info.index === info.section.data.length - 1}
      />
    );
  };

  renderSectionHeader = (elem: any) => (
    <ChooseYantraGroupHeader
      title={elem.section.title}
      theme={this.props.theme}
    />
  );

  keyExtractor = (yantra: Yantra, index: number) => yantra.id + index;

  onAddCustomYantra = () => {
    this.setState({overlayVisible: true});
  };

  onAddedCustomYantra = (title: string, value: number) => {
    if (title) {
      this.setState({overlayVisible: false});
    }
    this.props.addCustomYantra(title, value, this.props.parent);
  };

  onHideOverlay = () => {
    this.setState({overlayVisible: false});
  };

  onLayout = (rect: LayoutRectangle) =>
    this.setState({overlayHeight: rect.height});

  render() {
    return (
      <View style={this.state.styles.container}>
        <SectionList<Yantra>
          contentContainerStyle={this.state.styles.contentContainer}
          sections={(this.props.yantras as unknown) as SectionListData<any>[]}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ListHeaderComponent={
            <View style={this.state.styles.buttonContainer}>
              <FormButton
                theme={this.props.theme}
                parent={this.props.parent}
                onPress={this.onAddCustomYantra}
                title={localization.add_custom_yantra_title}
                containerStyle={this.state.styles.inputContainer}
                buttonTextStyle={this.state.styles.addButtonText}
              />
              <CustomYantraOverlay
                isVisible={this.state.overlayVisible}
                height={this.state.overlayHeight}
                theme={this.props.theme}
                parent={this.props.parent}
                onLayout={this.onLayout}
                cancle={this.onHideOverlay}
                add={this.onAddedCustomYantra}
              />
            </View>
          }
        />
      </View>
    );
  }
}

export const ChooseYantraScreen = withTheme(_ChooseYantraScreen);
