import { FC } from "react";
import SquareProgressBase, {
  SquareProgressBaseProps,
} from "../SquareProgressBase";

export type WhiteBgSquareProgressProps = Omit<
  SquareProgressBaseProps,
  "bgColor" | "cubeColor" | "animationDuration"
>;

const WhiteBgSquareProgress: FC<WhiteBgSquareProgressProps> = (props) => {
  return (
    <SquareProgressBase
      isError={props.isError}
      isLoading={props.isLoading}
      bgColor="bg-white"
      cubeColor="bg-instillBlue50"
      animationDuration={3}
    />
  );
};

export default WhiteBgSquareProgress;
