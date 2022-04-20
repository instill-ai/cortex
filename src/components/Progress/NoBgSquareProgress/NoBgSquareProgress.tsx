import { FC } from "react";
import SquareProgressBase, {
  SquareProgressBaseProps,
} from "../SquareProgressBase";

export type NoBgSquareProgressProps = Omit<
  SquareProgressBaseProps,
  "bgColor" | "cubeColor"
>;

const NoBgSquareProgress: FC<NoBgSquareProgressProps> = (props) => {
  return (
    <SquareProgressBase
      isError={props.isError}
      isLoading={props.isLoading}
      bgColor=""
      cubeColor="bg-instillBlue50"
      animationDuration={3}
    />
  );
};

export default NoBgSquareProgress;
