import { FC } from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type GrpcIconProps = Omit<IconBaseProps, "viewBox">;

const GrpcIcon: FC<GrpcIconProps> = (props) => {
  return (
    <IconBase
      viewBox="0 0 20 20"
      width={props.width}
      height={props.height}
      color={props.color}
      position={props.position}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 9.5L7.5 4L8.91421 5.41421L5.12132 9.20711H15.0858L11.2929 5.41421L12.7071 4L18.2071 9.5V10.9142L12.7071 16.4142L11.2929 15L15.0858 11.2071H5.12132L8.91421 15L7.5 16.4142L2 10.9142V9.5Z"
      />
    </IconBase>
  );
};

export default GrpcIcon;
