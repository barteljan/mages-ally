import React from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  LayoutAnimation,
  ViewStyle,
  StyleSheet,
  UIManager,
  Animated,
  Easing,
} from 'react-native';
import {SpellsStyle, makeSpellsStyle} from './Spells.styles';
import AddButton from './add-button/SpellsAddButton.container';
import {withTheme, Theme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../../components/DynamiclyStyledPureComponent';
import {SpellsProps} from './Spells.props';
import {SpellState} from './Spell.state';
import {SpellListItem} from './list-item/SpellListItem';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {isEqual} from 'lodash';

class _SpellsScreen extends DynamiclyStyledPureComponent<
  SpellsProps,
  SpellsStyle
> {
  constructor(props: SpellsProps) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  makeStyle() {
    return makeSpellsStyle(this.props.theme);
  }

  keyExtractor = (item: SpellState) => item.spellCastingConfig.id;

  rollDice = (id: string) => {
    this.props.rollDice(id);
  };

  componentDidUpdate(prevProps: SpellsProps) {
    super.componentDidUpdate(prevProps);

    if (prevProps.spells.length !== this.props.spells.length) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }

  renderItem = (elem: {item: SpellState}) => (
    <SpellListItem
      config={elem.item.spellCastingConfig}
      spell={elem.item.spell}
      showSpell={this.props.showSpell}
      onAction={this.rollDice}
    />
  );

  onDelete = (item: SpellState) => {
    this.props.delete(item.spellCastingConfig.id);
  };

  renderHiddenItem = (data: {item: SpellState}) => {
    return (
      <DeleteItem
        delete={this.props.delete}
        theme={this.props.theme}
        id={data.item.spellCastingConfig.id}
      />
    );
  };

  render() {
    const button =
      Platform.OS === 'android' ? <AddButton theme={this.props.theme} /> : null;

    const styles = this.state.styles;

    return (
      <View style={styles.container}>
        <SwipeListView<SpellState>
          style={styles.list}
          data={this.props.spells}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          renderHiddenItem={this.renderHiddenItem}
          ListEmptyComponent={
            <View style={styles.emptyComponentContainer}>
              <Text>No spells found!</Text>
            </View>
          }
          rightOpenValue={-75}
          disableRightSwipe={true}
          closeOnRowPress={true}
          closeOnRowOpen={true}
        />
        {button}
      </View>
    );
  }
}

export const SpellsScreen = withTheme(_SpellsScreen);

type DeleteItemProps = {
  theme: Theme;
  delete: (id: string) => void;
  id: string;
};

type DeleteItemStyle = {
  swipeBackground: ViewStyle;
  delete: ViewStyle;
};

type DeleteItemState = {
  styles: DeleteItemStyle;
  opacity: Animated.Value;
};

const makeDeleteItemStyle = (theme: Theme): DeleteItemStyle =>
  StyleSheet.create<DeleteItemStyle>({
    swipeBackground: {
      alignItems: 'center',
      backgroundColor: theme.colors.error,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    delete: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      right: 0,
    },
  });

export class DeleteItem extends React.PureComponent<
  DeleteItemProps,
  DeleteItemState
> {
  constructor(props: DeleteItemProps) {
    super(props);
  }

  makeStyle() {
    return makeDeleteItemStyle(this.props.theme);
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(
      {opacity: new Animated.Value(0), styles: this.makeStyle()},
      () => {
        Animated.timing(this.state.opacity, {
          toValue: 1,
          easing: Easing.back(1),
          duration: 2000,
          useNativeDriver: true,
        }).start();
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(prevProps: DeleteItemProps, prevState: DeleteItemState) {
    if (!this.state || !this.state.styles) {
      return;
    }
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles: styles});
    }
  }

  onDelete = () => {
    this.props.delete(this.props.id);
  };

  render() {
    if (!this.state || !this.state.styles) {
      return null;
    }

    return (
      <Animated.View
        style={[
          this.state.styles.swipeBackground,
          {opacity: this.state.opacity},
        ]}>
        <TouchableOpacity
          style={this.state.styles.delete}
          onPress={this.onDelete}>
          <Icon
            name="trash"
            color={this.props.theme.colors.surface}
            size={18}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
