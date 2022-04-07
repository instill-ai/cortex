import { FC } from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type HttpIconProps = Omit<IconBaseProps, "viewBox">;

const HttpIcon: FC<HttpIconProps> = (props) => {
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
        d="M10.5 3H12.5L8 17H6L10.5 3ZM5 6H3V8H5V6ZM5 12H3V14H5V12ZM16.5 3H14.5L10 17H12L16.5 3Z"
      />
    </IconBase>
  );
};

export default HttpIcon;
