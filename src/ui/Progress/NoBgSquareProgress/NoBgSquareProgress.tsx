import React from "react";
import SquareProgressBase, {
  SquareProgressBaseProps,
} from "../SquareProgressBase";

export type NoBgSquareProgressOmitKeys =
  | "bgColor"
  | "cubeColor"
  | "animationDuration";

export type NoBgSquareProgressConfig = Pick<
  SquareProgressBaseProps,
  NoBgSquareProgressOmitKeys
>;

export type NoBgSquareProgressProps = Omit<
  SquareProgressBaseProps,
  NoBgSquareProgressOmitKeys
>;

export const noBgSquareProgressConfig: NoBgSquareProgressConfig = {
  bgColor: null,
  cubeColor: "bg-instillBlue50",
  animationDuration: 3,
};

const NoBgSquareProgress: React.FC<NoBgSquareProgressProps> = (props) => {
  const { isLoading, position, blockSize } = props;

  return (
    <SquareProgressBase
      isLoading={isLoading}
      position={position}
      blockSize={blockSize}
      {...noBgSquareProgressConfig}
    />
  );
};

export default NoBgSquareProgress;
