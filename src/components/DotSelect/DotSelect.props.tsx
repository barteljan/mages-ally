export type DotSelectProps = {
  value: number;
  numberOfDots: number;
  identifier: string;
  didSelect?: (identifier: string, value: number) => void;
};
