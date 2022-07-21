import React from "react";
import { CollapseLeftIcon, CollapseRightIcon } from "../../Icons";
import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export type CollapseSidebarButtonRequiredKeys = "onClickHandler" | "isCollapse";

export type CollapseSidebarButtonOmitKeys =
  | "bgColor"
  | "textColor"
  | "disabledBgColor"
  | "disabledTextColor"
  | "padding"
  | "width"
  | "borderSize"
  | "borderColor"
  | "disabledBorderColor"
  | "hoveredBgColor"
  | "hoveredTextColor"
  | "hoveredBorderColor"
  | "borderRadius"
  | "startIcon"
  | "endIcon"
  | "itemGapX"
  | "type";

export type CollapseSidebarButtonConfig = Pick<
  ButtonBaseProps,
  CollapseSidebarButtonOmitKeys
>;

export const collapseSidebarButtonConfig: CollapseSidebarButtonConfig = {
  type: "button",
  width: null,
  borderSize: null,
  borderColor: null,
  disabledBorderColor: null,
  hoveredBorderColor: null,
  startIcon: null,
  endIcon: null,
  itemGapX: null,
  bgColor: "bg-instillGrey90",
  borderRadius: null,
  hoveredBgColor: "hover:bg-instillGrey80",
  textColor: null,
  hoveredTextColor: null,
  disabledBgColor: "bg-instillGrey90",
  disabledTextColor: null,
  padding: "p-[3px]",
};

export type FullCollapseSidebarButtonProps = Omit<
  ButtonBaseProps,
  CollapseSidebarButtonOmitKeys
> & { isCollapse: boolean };

export type CollapseSidebarButtonRequiredProps = Pick<
  FullCollapseSidebarButtonProps,
  CollapseSidebarButtonRequiredKeys
>;

export type CollapseSidebarButtonOptionalProps = Partial<
  Omit<FullCollapseSidebarButtonProps, CollapseSidebarButtonRequiredKeys>
>;

export type CollapseSidebarButtonProps = CollapseSidebarButtonRequiredProps &
  CollapseSidebarButtonOptionalProps;

const CollapseSidebarButton: React.FC<CollapseSidebarButtonProps> = (props) => {
  return (
    <ButtonBase
      onClickHandler={props.onClickHandler}
      disabled={props.disabled ?? false}
      position={props.position ?? null}
      dataFlag={props.dataFlag ?? null}
      {...collapseSidebarButtonConfig}
    >
      {props.isCollapse ? (
        <CollapseRightIcon
          width="w-[14px]"
          height="h-[14px]"
          position="m-auto"
          color="fill-instillGrey05 group-hover:fill-instillBlue50"
        />
      ) : (
        <CollapseLeftIcon
          width="w-[14px]"
          height="h-[14px]"
          position="m-auto"
          color="fill-instillGrey05 group-hover:fill-instillBlue50"
        />
      )}
    </ButtonBase>
  );
};

export default CollapseSidebarButton;
