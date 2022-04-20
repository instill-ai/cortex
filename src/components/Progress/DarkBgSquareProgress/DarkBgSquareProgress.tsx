import { FC } from "react";
import SquareProgressBase, {
  SquareProgressBaseProps,
} from "../SquareProgressBase";

export type DarkBgSquareProgressProps = Omit<
  SquareProgressBaseProps,
  "bgColor" | "cubeColor" | "animationDuration"
>;

const DarkBgSquareProgress: FC<DarkBgSquareProgressProps> = (props) => {
  return (
    <SquareProgressBase
      isError={props.isError}
      isLoading={props.isLoading}
      bgColor="bg-instillGray80"
      cubeColor="bg-instillBlue50"
      animationDuration={3}
    />
  );
};

export default DarkBgSquareProgress;
