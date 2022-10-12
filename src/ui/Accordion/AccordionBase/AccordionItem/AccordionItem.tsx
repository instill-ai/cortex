import React from "react";
import cn from "clsx";
import { Nullable } from "../../../../types/general";

export type AccordionItemHeaderStyleProps = {
  /** TailwindCSS format - The font style of the accordion item's header
   * - e.g. bg-blue-100
   */
  headerFont: string;
  headerBgColor: string;
  headerTextSize: string;
  headerTextColor: string;
  headerFontWeight: string;
  headerPadding: Nullable<string>;
  headerActiveIcon: React.ReactElement;
  headerInActiveIcon: React.ReactElement;
};

export type AccordionItemProps = {
  type: "withIcon" | "basic";
  header: string;
  enableHeaderIcon: boolean;
  contentBgColor: string;
  selfIndex: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  contentWidth: Nullable<string>;
  content: Nullable<React.ReactNode>;
  itemIcon: Nullable<React.ReactElement>;
  itemIconContainerPosition: Nullable<string>;
} & AccordionItemHeaderStyleProps;

const AccordionItem = (props: AccordionItemProps) => {
  const {
    type,
    itemIcon,
    itemIconContainerPosition,
    headerBgColor,
    contentBgColor,
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
    contentWidth,
    headerActiveIcon,
    headerInActiveIcon,
  } = props;

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden",
        type === "withIcon" ? "relative" : ""
      )}
    >
      {type === "withIcon" ? (
        <div
          onClick={() => setActiveIndex(selfIndex)}
          className={cn("flex absolute", itemIconContainerPosition)}
        >
          {itemIcon}
        </div>
      ) : null}
      <div
        onClick={() => setActiveIndex(selfIndex)}
        className={cn(
          "flex flex-row cursor-pointer",
          headerPadding,
          headerBgColor
        )}
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
            {selfIndex === activeIndex ? headerActiveIcon : headerInActiveIcon}
          </>
        ) : null}
      </div>
      <div className={cn("w-full", contentBgColor)}>
        <div
          className={cn(
            contentWidth,
            selfIndex === activeIndex ? "flex" : "hidden"
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
