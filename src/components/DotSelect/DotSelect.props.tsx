export type DotSelectProps = {
  value: number;
  numberOfDots: number;
  identifier: string;
  parent: string;
  dotSize?: number;
  didSelect?: (identifier: string, value: number, parent: string) => void;
  color?: string;
};
