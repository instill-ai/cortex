import * as React from "react";
import { IconBase, IconBaseProps } from "./IconBase";

export const Refresh = React.forwardRef<
  SVGSVGElement,
  Omit<IconBaseProps, "viewBox" | "children">
>((props, ref) => {
  const { className, ...passThrough } = props;
  return (
    <IconBase
      {...passThrough}
      ref={ref}
      viewBox="0 0 25 25"
      className={className}
    >
      <path
        d="M13.6354 8.59536C13.4502 10.3353 12.4643 11.9658 10.833 12.9076C8.12269 14.4724 4.65701 13.5438 3.0922 10.8335L2.92554 10.5448M2.36417 7.40467C2.54937 5.66474 3.53523 4.03426 5.16655 3.09241C7.87688 1.5276 11.3426 2.45623 12.9074 5.16655L13.074 5.45523M2.32886 12.044L2.81689 10.2227L4.63826 10.7107M11.3617 5.28934L13.183 5.77737L13.6711 3.95601"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
});
Refresh.displayName = "IconRefresh";
