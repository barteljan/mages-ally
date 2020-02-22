export type DotSelectProps = {
  value: number;
  numberOfDots: number;
  identifier: string;
  parent: string;
  didSelect?: (identifier: string, value: number, parent: string) => void;
};
