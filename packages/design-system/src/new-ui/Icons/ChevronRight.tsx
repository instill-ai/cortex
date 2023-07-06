import * as React from "react";
import { IconBase, IconBaseProps } from "./IconBase";

export const ChevronRight = React.forwardRef<
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
      <path
        d="M9 18L15 12L9 6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </IconBase>
  );
});
ChevronRight.displayName = "IconChevronRight";
