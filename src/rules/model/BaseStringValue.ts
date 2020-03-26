import {BaseGameValue} from './BaseGameValue';

export type BaseStringValue<
  IdType extends string = string,
  ValueType extends string = string
> = BaseGameValue & {
  id: IdType;
  value: ValueType;
};
