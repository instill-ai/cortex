import * as React from "react";
import { IconBase, IconBaseProps } from "../Icons/IconBase";

export const ToggleLeft = React.forwardRef<
  SVGSVGElement,
  Omit<IconBaseProps, "viewBox" | "children"> & {
    fillAreaColor: string;
  }
>((props, ref) => {
  const { className, fillAreaColor, ...passThrough } = props;
  return (
    <IconBase
      {...passThrough}
      ref={ref}
      viewBox="0 0 30 30"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.28163 7.40796H16.2816C19.0431 7.40796 21.2816 9.64654 21.2816 12.408C21.2816 15.1694 19.0431 17.408 16.2816 17.408H8.28163C5.52021 17.408 3.28163 15.1694 3.28163 12.408C3.28163 9.64654 5.52021 7.40796 8.28163 7.40796ZM16.2816 5.40796H8.28163C4.41564 5.40796 1.28163 8.54197 1.28163 12.408C1.28163 16.274 4.41564 19.408 8.28163 19.408H16.2816C20.1476 19.408 23.2816 16.274 23.2816 12.408C23.2816 8.54197 20.1476 5.40796 16.2816 5.40796ZM7.55836 12.408C7.55836 11.8557 8.00608 11.408 8.55836 11.408C9.11065 11.408 9.55836 11.8557 9.55836 12.408C9.55836 12.9602 9.11065 13.408 8.55836 13.408C8.00608 13.408 7.55836 12.9602 7.55836 12.408ZM8.55836 9.40796C6.90151 9.40796 5.55836 10.7511 5.55836 12.408C5.55836 14.0648 6.90151 15.408 8.55836 15.408C10.2152 15.408 11.5584 14.0648 11.5584 12.408C11.5584 10.7511 10.2152 9.40796 8.55836 9.40796Z"
        className={fillAreaColor}
      />
    </IconBase>
  );
});
ToggleLeft.displayName = "ToggleLeft";
