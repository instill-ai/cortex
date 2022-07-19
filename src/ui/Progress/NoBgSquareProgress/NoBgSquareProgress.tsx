import React from "react";
import SquareProgressBase, {
  SquareProgressBaseProps,
} from "../SquareProgressBase";

export type NoBgSquareProgressProps = Omit<
  SquareProgressBaseProps,
  "bgColor" | "cubeColor" | "animationDuration"
>;

const NoBgSquareProgress: React.FC<NoBgSquareProgressProps> = (props) => {
  return (
    <SquareProgressBase
      isLoading={props.isLoading}
      position={props.position}
      blockSize={props.blockSize}
      bgColor=""
      cubeColor="bg-instillBlue50"
      animationDuration={3}
    />
  );
};

export default NoBgSquareProgress;
