import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params: any = {}) {
  // eslint-disable-next-line prettier/prettier
  navigationRef.current?.navigate(name, params);
}
