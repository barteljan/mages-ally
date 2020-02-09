import {LayoutRectangle} from 'react-native';

export enum LayoutWidth {
  small = 374,
  medium = 414,
  large = 10000,
}

export function getLayoutWidth(size: LayoutRectangle): LayoutWidth {
  if (size.width <= LayoutWidth.small) {
    return LayoutWidth.small;
  } else if (size.width <= LayoutWidth.medium) {
    return LayoutWidth.medium;
  } else {
    return LayoutWidth.large;
  }
}
