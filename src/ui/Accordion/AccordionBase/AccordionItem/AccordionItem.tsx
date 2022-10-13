import React from "react";
import cn from "clsx";
import { Nullable } from "../../../../types/general";

export type AccordionItemHeaderStyleProps = {
  /** TailwindCSS format - The font style of the accordion item's header
   * - e.g. font-sans
   */
  headerFont: string;

  /** TailwindCSS format - The background color of the accordion item's header
   * - e.g. bg-blue-500
   */
  headerBgColor: string;

  /** TailwindCSS format - The text size of the accordion item's header
   * - e.g. text-base
   */
  headerTextSize: string;

  /** TailwindCSS format - The text color of the accordion item's header
   * - e.g. text-blue-500
   */
  headerTextColor: string;

  /** TailwindCSS format - The font weight of the accordion item's header
   * - e.g. font-normal
   */
  headerFontWeight: string;

  /** TailwindCSS format - The padding of the accordion item's header
   * - e.g. p-5
   */
  headerPadding: Nullable<string>;

  /**
   * The header's icon when this accordion item is active. It will be put one
   * the right side of the header regardless the icon's position
   */
  headerActiveIcon: React.ReactElement;

  /**
   * The header's icon when this accordion item is inactive. It will be put one
   * the right side of the header regardless the icon's position
   */
  headerInActiveIcon: React.ReactElement;
};

export type AccordionItemProps = {
  /**
   * We have two type of accordion item right now. `withIcon` will display the
   * specific item icon consumer indicated at a absolute position. `basic` will
   * not display this item icon.
   */
  type: "withIcon" | "basic";

  /**
   * The icon that will be displayed on the accordion item at a absolute position.
   * Please use itemIconContainerPosition to indicate the position.
   */
  itemIcon: Nullable<React.ReactElement>;

  /**
   * The position of item icon.
   */
  itemIconContainerPosition: Nullable<string>;

  /**
   * The text of header.
   */
  header: string;

  /**
   * Whether enable header's icon or not.
   */
  enableHeaderIcon: boolean;

  /**
   * The content of the accordion item.
   */
  content: Nullable<React.ReactNode>;

  /**
   * The background color of the content.
   */
  contentBgColor: string;

  /**
   * TailwindCSS format - The width of the content.
   * - e.g. w-1/2
   * - Please use this paired with `withIcon`
   */
  contentWidth: Nullable<string>;

  /**
   * The index of the accordion item
   */
  selfIndex: number;

  /**
   * Current active index of the accordion
   */
  activeIndex: number;

  /**
   * React dispatch function that change the current active index of the
   * accordion
   */
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
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
