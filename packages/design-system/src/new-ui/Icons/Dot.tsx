import * as React from "react";
import { IconBase, IconBaseProps } from "./IconBase";

export const Dot = React.forwardRef<
  SVGSVGElement,
  Omit<IconBaseProps, "viewBox" | "children">
>((props, ref) => {
  const { className, ...passThrough } = props;
  return (
    <IconBase
      {...passThrough}
      ref={ref}
      viewBox="0 0 24 24"
      className={className}
    >
      <circle cx="5" cy="5" r="4" fill="white" />
    </IconBase>
  );
});
Dot.displayName = "IconDot";
