import React from 'react';
import {YantraSelectRow} from './YantraSelectRow/YantraSelectRow';
import {
  ChooseYantraScreenStyle,
  makeChooseYantraScreenStyle,
} from './ChooseYantra.styles';
import {ChooseYantraScreenProps} from './ChooseYantra.props';
import {withTheme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {View, SectionList, SectionListData} from 'react-native';
import {Yantra} from '../../../../rules/spells/yantra/yantra';
import {ChooseYantraGroupHeader} from './ChooseYantraGroupHeader/ChooseYantraGroupHeader';

interface IHeader {
  section: SectionListData<{title: string}>;
}

class _ChooseYantraScreen extends DynamiclyStyledPureComponent<
  ChooseYantraScreenProps,
  ChooseYantraScreenStyle
> {
  makeStyle(): ChooseYantraScreenStyle {
    return makeChooseYantraScreenStyle(this.props.theme);
  }

  onSelectYantra = (yantra: Yantra) =>
    this.props.didSelectYantra(yantra, this.props.parent);

  renderItem = (elem: any) => {
    const item = elem.item as Yantra;
    return (
      <YantraSelectRow
        yantra={item}
        theme={this.props.theme}
        didSelectYantra={this.onSelectYantra}
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

  render() {
    console.log('ChooseYantraScreen props:', this.props);
    return (
      <View style={this.state.styles.container}>
        <SectionList
          contentContainerStyle={this.state.styles.contentContainer}
          sections={(this.props.yantras as unknown) as SectionListData<any>[]}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  }
}

export const ChooseYantraScreen = withTheme(_ChooseYantraScreen);
