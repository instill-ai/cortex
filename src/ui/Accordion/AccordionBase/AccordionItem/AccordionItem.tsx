import React from "react";
import cn from "clsx";
import { Nullable } from "../../../../types/general";
import { MinusIcon, PlusIcon } from "../../../Icons";

export type AccordionItemHeaderStyleProps = {
  /** TailwindCSS format - The font style of the accordion item's header
   * - e.g. bg-blue-100
   */
  headerFont: string;
  headerTextSize: string;
  headerTextColor: string;
  headerFontWeight: string;
  headerIconWidth: string;
  headerIconHeight: string;
  headerIconColor: string;
  headerIconPosition: string;
  headerPadding: Nullable<string>;
};

export type AccordionItemProps = {
  type: "withIcon" | "basic";
  header: string;
  enableHeaderIcon: boolean;
  bgColor: string;
  selfIndex: number;
  activeIndex: number;
  contentWidth: string;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  content: Nullable<React.ReactNode>;
  itemIcon: Nullable<React.ReactElement>;
  itemIconPosition: Nullable<string>;
} & AccordionItemHeaderStyleProps;

const AccordionItem = (props: AccordionItemProps) => {
  const {
    type,
    itemIcon,
    itemIconPosition,
    bgColor,
    selfIndex,
    activeIndex,
    setActiveIndex,
    content,
    header,
    enableHeaderIcon,
    headerFont,
    headerTextSize,
    headerFontWeight,
    headerTextColor,
    headerPadding,
    headerIconWidth,
    headerIconHeight,
    headerIconColor,
    headerIconPosition,
    contentWidth,
  } = props;

  const headerIconStyle = {
    width: headerIconWidth,
    height: headerIconHeight,
    color: headerIconColor,
    position: headerIconPosition,
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden",
        bgColor,
        type === "withIcon" ? "relative" : ""
      )}
    >
      {type === "withIcon" ? (
        <div className={cn("flex absolute z-0", itemIconPosition)}>
          {itemIcon}
        </div>
      ) : null}
      <div
        onClick={() => setActiveIndex(selfIndex)}
        className={cn("flex flex-row cursor-pointer z-10", headerPadding)}
      >
        <div
          className={cn(
            "mr-auto",
            headerFont,
            headerTextSize,
            headerTextColor,
            headerFontWeight
          )}
        >
          {header}
        </div>
        {enableHeaderIcon ? (
          <>
            {selfIndex === activeIndex ? (
              <PlusIcon {...headerIconStyle} />
            ) : (
              <MinusIcon {...headerIconStyle} />
            )}
          </>
        ) : null}
      </div>
      <div
        className={cn(
          contentWidth,
          selfIndex === activeIndex ? "flex" : "hidden"
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default AccordionItem;
