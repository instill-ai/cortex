import React from "react";
import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export type OutlineButtonRequiredKeys = "type" | "color";

export type OutlineButtonOmitKeys =
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

export type OutlineButtonConfig = Pick<ButtonBaseProps, OutlineButtonOmitKeys>;

export type FullOutlineButtonProps = Omit<
  ButtonBaseProps,
  OutlineButtonOmitKeys
> & {
  color: "primary" | "secondary" | "danger";
};

export type OutlineButtonRequiredProps = Pick<
  FullOutlineButtonProps,
  OutlineButtonRequiredKeys
>;

export type OutlineButtonOptionalProps = Partial<
  Omit<FullOutlineButtonProps, OutlineButtonRequiredKeys>
>;

export type OutlineButtonProps = OutlineButtonRequiredProps &
  OutlineButtonOptionalProps;

const OutlineButton: React.FC<OutlineButtonProps> = (props) => {
  let buttonStyle = {} as OutlineButtonConfig;

  switch (props.color) {
    case "primary": {
      buttonStyle = {
        borderSize: "border-[1px]",
        borderColor: "border-instillBlue50",
        hoveredBorderColor: "hover:border-instillBlue50",
        disabledBorderColor: "border-instillGrey30",
        borderRadius: "rounded-[1px]",
        bgColor: null,
        hoveredBgColor: "hover:bg-instillBlue50",
        disabledBgColor: null,
        textColor: "text-instillBlue50",
        hoveredTextColor: "hover:text-instillBlue10",
        disabledTextColor: "text-instillGrey30",
      };
      break;
    }
    case "secondary": {
      buttonStyle = {
        borderSize: "border-[1px]",
        borderColor: "border-instillGrey50",
        hoveredBorderColor: "hover:border-instillGrey50",
        disabledBorderColor: "border-instillGrey30",
        borderRadius: "rounded-[1px]",
        bgColor: null,
        hoveredBgColor: "hover:bg-instillGrey50",
        disabledBgColor: null,
        textColor: "text-instillGrey50",
        hoveredTextColor: "hover:text-instillGrey05",
        disabledTextColor: "text-instillGrey30",
      };
      break;
    }
    case "danger": {
      buttonStyle = {
        borderSize: "border-[1px]",
        borderColor: "border-instillRed",
        hoveredBorderColor: "hover:border-instillRed",
        disabledBorderColor: "border-instillGrey30",
        borderRadius: "rounded-[1px]",
        bgColor: null,
        hoveredBgColor: "hover:bg-instillRed",
        disabledBgColor: null,
        textColor: "text-instillRed",
        hoveredTextColor: "hover:text-instillRed10",
        disabledTextColor: "text-instillGrey30",
      };
      break;
    }
    default: {
      throw new Error(
        `Button variant ${props.color} not support, OutlineButton only support variant=primary`
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

export default OutlineButton;
