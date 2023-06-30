import * as React from "react";
import { LogoBase, LogoBaseProps } from "./LogoBase";

export const MDLExpand = React.forwardRef<
  SVGSVGElement,
  Omit<LogoBaseProps, "viewBox" | "children">
>((props, ref) => {
  const { className, ...passThrough } = props;
  return (
    <LogoBase
      {...passThrough}
      ref={ref}
      viewBox="0 0 71 27"
      className={className}
    >
      <path
        d="M55.0182 2.74929H50.5729V24.8183H68.2281V20.373H55.0182V2.74929Z"
        fill="#F6F6F6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M57.1632 0.604324V18.228H70.373V26.9633H48.4279V0.604324H57.1632ZM68.2281 20.373V24.8183H50.5729V2.74929H55.0182V20.373H68.2281Z"
        fill="#2B2B2B"
      />
      <path
        d="M50.5729 2.74929H55.0662V7.16898H50.5729V2.74929Z"
        fill="#40A8F5"
      />
      <path
        d="M50.5729 7.16898H55.0662L55.0662 11.5887H50.5729L50.5729 7.16898Z"
        fill="#40A8F5"
      />
      <path
        d="M50.5729 11.5887H55.0662V16.0083H50.5729V11.5887Z"
        fill="#40A8F5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50.5729 14.9359H55.0662V17.0808H50.5729V14.9359Z"
        fill="#2B2B2B"
      />
      <path
        d="M44.0141 7.19983V2.78603H26.3589V24.855H44.0141V20.4412H30.7727V7.19983H44.0141ZM44.0141 20.4412H48.4279V7.19983H44.0141V20.4412Z"
        fill="#F6F6F6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.1591 0.641069V5.05487H50.5729V22.5862H46.1591V27H24.214V0.641069H46.1591ZM44.0141 20.4412V24.855H26.3589V2.78603H44.0141V7.19983H30.7727V20.4412H44.0141ZM32.9177 18.2963H41.8692V9.3448H32.9177V18.2963ZM44.0141 7.19983V20.4412H48.4279V7.19983H44.0141Z"
        fill="#2B2B2B"
      />
      <path
        d="M26.3589 20.4648H30.7786V24.8845H26.3589V20.4648Z"
        fill="#FFDF3A"
      />
      <path
        d="M30.7295 20.3911H35.1492V24.8845H30.7295V20.3911Z"
        fill="#FFDF3A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.0767 24.8845V20.3911H36.2217V24.8845H34.0767Z"
        fill="#2B2B2B"
      />
      <path
        d="M30.7786 20.4648H26.3589L26.3589 16.0451H30.7786L30.7786 20.4648Z"
        fill="#FFDF3A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.7786 17.1176H26.3589V14.9726H30.7786V17.1176Z"
        fill="#2B2B2B"
      />
      <path
        d="M6.55876 2.78599H2.14496V24.855H6.55876V11.6766H10.9726V7.26284H6.55876V2.78599ZM19.8002 7.26284H15.3864V11.6766H19.8002V24.855H24.214V2.78599H19.8002V7.26284ZM15.3864 16.0904V11.6766H10.9726V16.0904H15.3864Z"
        fill="#F6F6F6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.70372 0.641023V5.11788H13.1175V9.53168H13.2414V5.11788H17.6552V0.641023H26.3589V27H17.6552V13.8216H17.5313V18.2354H8.8276V13.8216H8.70372V27H0V0.641023H8.70372ZM6.55876 2.78599V7.26284H10.9726V11.6766H6.55876V24.855H2.14496V2.78599H6.55876ZM10.9726 11.6766V16.0904H15.3864V11.6766H19.8002V24.855H24.214V2.78599H19.8002V7.26284H15.3864V11.6766H10.9726Z"
        fill="#2B2B2B"
      />
      <path
        d="M10.9672 11.6696H15.3868V16.0893H10.9672V11.6696Z"
        fill="#28F67E"
      />
    </LogoBase>
  );
});
MDLExpand.displayName = "MDLExpand";
