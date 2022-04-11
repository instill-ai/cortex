import { FC } from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type XIconProps = Omit<IconBaseProps, "viewBox">;

const XIcon: FC<XIconProps> = (props) => {
  return (
    <IconBase
      viewBox="0 0 30 30"
      width={props.width}
      height={props.height}
      color={props.color}
      position={props.position}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 13.5L22.5 6L24 7.5L16.5 15L24 22.5L22.5 24L15 16.5L7.5 24L6 22.5L13.5 15L6.00002 7.5L7.50002 6L15 13.5Z"
      />
    </IconBase>
  );
};

export default XIcon;
