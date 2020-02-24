import React from 'react';
import {DynamiclyStyledPureComponent} from '../../../../../components/DynamiclyStyledPureComponent';
import {View} from 'react-native';
import {spellFactorLevelName} from '../../../../../rules/spells/spell-factors/SpellFactor.strings';
import {SpellFactorLevel} from '../../../../../rules/spells/spell-factors/SpellFactor.level';
import {Overlay, ButtonGroup} from 'react-native-elements';
import {SpellfactorOverlayProps} from './SpellFactorOverlay.props';
import {makeSpellFactorOverlayStyle} from './SpellFactorOverlay.style';
import {SpellFactorOverlayStyle} from './SpellFactorOverlay.style';

export class SpellFactorOverlay extends DynamiclyStyledPureComponent<
  SpellfactorOverlayProps,
  SpellFactorOverlayStyle
> {
  makeStyle() {
    return makeSpellFactorOverlayStyle(this.props.theme);
  }

  buttons = [
    spellFactorLevelName(SpellFactorLevel.standard),
    spellFactorLevelName(SpellFactorLevel.advanced),
  ];

  indexFromLevel(level: SpellFactorLevel) {
    switch (level) {
      case SpellFactorLevel.standard:
        return 0;
      case SpellFactorLevel.advanced:
        return 1;
    }
  }

  switchTabs = (index: number) => {
    let level = SpellFactorLevel.standard;
    if (index === 1) {
      level = SpellFactorLevel.advanced;
    }
    this.props.setSpellFactorLevel(this.props.factor, level, this.props.parent);
  };

  render() {
    const content =
      this.props.level === SpellFactorLevel.standard
        ? this.props.standardComponent
        : this.props.advancedComponent;
    return (
      <Overlay
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onBackdropPress}
        supportedOrientations={['portrait', 'landscape']}
        fullScreen={false}
        height={this.props.height}>
        <View style={this.state.styles.container}>
          <ButtonGroup
            buttons={this.buttons}
            selectedIndex={this.indexFromLevel(this.props.level)}
            onPress={this.switchTabs}
            selectedButtonStyle={this.state.styles.selectedButton}
          />
          <View style={this.state.styles.content}>{content}</View>
        </View>
      </Overlay>
    );
  }
}
