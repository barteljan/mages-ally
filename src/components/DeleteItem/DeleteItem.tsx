import React from 'react';
import {TouchableOpacity, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {isEqual} from 'lodash';
import {DeleteItemProps} from './DeleteItem.props';
import {DeleteItemStyle, makeDeleteItemStyle} from './DeleteItem.style';

export type DeleteItemState = {
  styles: DeleteItemStyle;
  opacity: Animated.Value;
};

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
          this.props.containerStyle,
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
