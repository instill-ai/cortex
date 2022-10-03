import React from "react";
import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export type TextButtonRequiredKeys = "type" | "color";

export type TextButtonOmitKeys =
  | "borderSize"
  | "borderColor"
  | "hoveredBorderColor"
  | "disabledBorderColor"
  | "bgColor"
  | "bgOpacity"
  | "disabledBgColor"
  | "disabledBgOpacity"
  | "hoveredBgColor"
  | "hoveredBgOpacity"
  | "textColor"
  | "hoveredTextColor"
  | "disabledTextColor"
  | "borderRadius";

export type TextButtonConfig = Pick<ButtonBaseProps, TextButtonOmitKeys>;

export type FullTextButtonProps = Omit<ButtonBaseProps, TextButtonOmitKeys> & {
  color: "primary";
};

export type TextButtonRequiredProps = Pick<
  FullTextButtonProps,
  TextButtonRequiredKeys
>;

export type TextButtonOptionalProps = Partial<
  Omit<FullTextButtonProps, TextButtonRequiredKeys>
>;

export type TextButtonProps = TextButtonRequiredProps & TextButtonOptionalProps;

const TextButton: React.FC<TextButtonProps> = (props) => {
  let buttonStyle = {} as TextButtonConfig;

  switch (props.color) {
    case "primary": {
      buttonStyle = {
        borderSize: null,
        borderColor: null,
        hoveredBorderColor: null,
        disabledBorderColor: null,
        borderRadius: null,
        bgColor: null,
        hoveredBgColor: null,
        textColor: "text-instillBlue50",
        hoveredTextColor: "hover:text-instillBlue80",
        disabledBgColor: null,
        disabledTextColor: "text-instillGrey50",
        disabledBgOpacity: null,
        hoveredBgOpacity: null,
        bgOpacity: null,
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
        `Button variant ${props.color} not support, TextButton only support variant=primary`
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
      startIcon={props.startIcon ?? null}
      endIcon={props.endIcon ?? null}
      itemGapX={props.itemGapX ?? null}
      padding={props.padding ?? "px-5 py-2.5"}
      textSize={props.textSize ?? "text-base"}
      {...buttonStyle}
    >
      {props.children}
    </ButtonBase>
  );
};

export default TextButton;
