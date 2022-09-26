import React from "react";
import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export type SolidButtonRequiredKeys = "type" | "color";

export type SolidButtonOmitKeys =
  | "borderSize"
  | "borderColor"
  | "hoveredBorderColor"
  | "disabledBorderColor"
  | "bgColor"
  | "disabledBgColor"
  | "hoveredBgColor"
  | "textColor"
  | "hoveredTextColor"
  | "disabledTextColor"
  | "borderRadius";

export type SolidButtonConfig = Pick<ButtonBaseProps, SolidButtonOmitKeys>;

export type FullSolidButtonProps = Omit<
  ButtonBaseProps,
  SolidButtonOmitKeys
> & {
  color: "primary";
};

export type SolidButtonRequiredProps = Pick<
  FullSolidButtonProps,
  SolidButtonRequiredKeys
>;

export type SolidButtonOptionalProps = Partial<
  Omit<FullSolidButtonProps, SolidButtonRequiredKeys>
>;

export type SolidButtonProps = SolidButtonRequiredProps &
  SolidButtonOptionalProps;

const SolidButton: React.FC<SolidButtonProps> = (props) => {
  let buttonStyle = {} as SolidButtonConfig;

  switch (props.color) {
    case "primary": {
      buttonStyle = {
        borderSize: null,
        borderColor: null,
        hoveredBorderColor: null,
        disabledBorderColor: null,
        borderRadius: "rounded-[1px]",
        bgColor: "bg-instillBlue50",
        hoveredBgColor: "hover:bg-instillBlue80",
        textColor: "text-instillGrey05",
        hoveredTextColor: "hover:text-instillBlue10",
        disabledBgColor: "bg-instillGrey15",
        disabledTextColor: "text-instillGrey50",
      };
      break;
    }
    // case "danger": {
    //   buttonStyle = {
    //     borderSize: null,
    //     borderColor: null,
    //     hoveredBorderColor: null,
    //     disabledBorderColor: null,
    //     borderRadius: "rounded-[1px]",
    //     bgColor: "bg-instillRed",
    //     hoveredBgColor: "hover:bg-instillBlue80",
    //     textColor: "text-instillRed10",
    //     hoveredTextColor: "hover:text-instillRed10",
    //     disabledBgColor: "bg-instillGrey05",
    //     disabledTextColor: "text-instillGrey30",
    //   };
    //   break;
    // }
    default: {
      throw new Error(
        `Button variant ${props.color} not support, SolidButton only support variant=primary`
      );
    }
  }

  return (
    <ButtonBase
      type={props.type}
      disabled={props.disabled ?? false}
      onClickHandler={props.onClickHandler ?? null}
      position={props.position ?? null}
      dataFlag={props.dataFlag ?? null}
      width={props.width ?? null}
      padding={props.padding ?? "px-5 py-2.5"}
      startIcon={props.startIcon ?? null}
      endIcon={props.endIcon ?? null}
      itemGapX={props.itemGapX ?? null}
      textSize={props.textSize ?? "text-base"}
      {...buttonStyle}
    >
      {props.children}
    </ButtonBase>
  );
};

export default SolidButton;
