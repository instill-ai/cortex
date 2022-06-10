import React from "react";
import SquareProgressBase, {
  SquareProgressBaseProps,
} from "../SquareProgressBase";

export type WhiteBgSquareProgressProps = Omit<
  SquareProgressBaseProps,
  "bgColor" | "cubeColor" | "animationDuration"
>;

const WhiteBgSquareProgress: React.FC<WhiteBgSquareProgressProps> = (props) => {
  return (
    <SquareProgressBase
      isLoading={props.isLoading}
      blockSize={props.blockSize}
      position={props.position}
      bgColor="bg-white"
      cubeColor="bg-instillBlue50"
      animationDuration={3}
    />
  );
};

export default WhiteBgSquareProgress;
