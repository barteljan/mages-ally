import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {Dot} from '../Dot/Dot';
import {style} from './DotSelect.style';
import {DotSelectProps} from './DotSelect.props';
export class DotSelect extends PureComponent<DotSelectProps> {
  onSelect = (value: number) => {
    if (this.props.didSelect) {
      this.props.didSelect(this.props.identifier, value);
    }
  };
  render() {
    const dotSize = 22;
    let dots: Element[] = [];
    for (let i = 0; i < this.props.numberOfDots; i++) {
      if (i % 5 === 0) {
        dots.push(
          <View
            style={style.spacer}
            key={this.props.identifier + '_spacer' + i}
          />,
        );
      }
      dots.push(
        <Dot
          seleced={this.props.value > i}
          key={this.props.identifier + '_dot' + i}
          value={i + 1}
          containerStyle={style.dotContainer}
          onPress={this.onSelect}
          size={dotSize}
        />,
      );
    }
    return (
      <View style={style.container} key={this.props.identifier + '_container'}>
        {dots}
      </View>
    );
  }
}
