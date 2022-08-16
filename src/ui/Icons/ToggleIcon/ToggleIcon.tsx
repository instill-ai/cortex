import React from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type ToggleIconProps = Omit<IconBaseProps, "viewBox" | "fill">;

const ToggleIcon: React.FC<ToggleIconProps> = (props) => {
  return (
    <IconBase
      viewBox="0 0 30 30"
      width={props.width}
      height={props.height}
      color={props.color}
      position={props.position}
    >
      <path d="M15 22L8.0718 10L21.9282 10L15 22Z" />
    </IconBase>
  );
};

export default ToggleIcon;
