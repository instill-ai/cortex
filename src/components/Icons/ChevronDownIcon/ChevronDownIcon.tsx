import { FC } from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type ChevronDownIconProps = Omit<IconBaseProps, "viewBox">;

const ChevronDownIcon: FC<ChevronDownIconProps> = (props) => {
  return (
    <IconBase
      viewBox="0 0 20 20"
      width={props.width}
      height={props.height}
      color={props.color}
      position={props.position}
    ></IconBase>
  );
};

export default ChevronDownIcon;
