import {PureComponent} from 'react';
import {isEqual} from 'lodash';

export abstract class DynamiclyStyledPureComponent<
  Props,
  Style,
  State = {styles: Style}
> extends PureComponent<Props, State & {styles: Style}> {
  //@ts-ignore
  state = {
    styles: this.makeStyle(),
  };

  abstract makeStyle(): Style;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(prevProps: Props) {
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      //@ts-ignore
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles: styles});
    }
  }
}
