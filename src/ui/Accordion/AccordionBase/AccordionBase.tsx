import React from "react";
import cn from "clsx";
import { Nullable } from "../../../types/general";

// Due to AccordionItem is a exposed level item, it can accept undefinded value.

export type AccordionItem = {
  /**
   * The background icon that will be displayed on the accordion item at a
   * absolute position. Please use bgIconPosition to indicate the
   * position.
   */
  bgIcon?: React.ReactElement;

  /**
   * The text of header.
   */
  header: string;

  /**
   * The content of the accordion item.
   */
  content?: React.ReactNode;

  /** TailwindCSS format - The text color of the accordion item's header
   * when this item is in active state.
   * - e.g. text-blue-500
   */
  headerActiveTextColor: string;

  /** TailwindCSS format - The text color of the accordion item's header
   * when this item is in inactive state.
   * - e.g. text-blue-500
   */
  headerInActiveTextColor: string;

  /** TailwindCSS format - The background color of the accordion item's header
   * when this item is in active state.
   * - e.g. bg-blue-500
   */
  headerActiveBgColor: string;

  /** TailwindCSS format - The background color of the accordion item's header
   * when this item is in active state.
   * - e.g. bg-blue-500
   */
  headerInActiveBgColor: string;
};

export type AccordionBaseProps = {
  /**
   * We have two type of accordion item right now. `withIcon` will display the
   * specific item icon consumer indicated at a absolute position. `basic` will
   * not display this item icon.
   */
  type: "withIcon" | "basic";

  /**
   * The width of Accordion
   * - default: w-full
   */

  width: string;

  /**
   * The active index of the accordion
   */
  activeIndex: number;

  /**
   * React dispatch method to set the active index of the accordion
   */

  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;

  /**
   * The gap between each accordion items
   */
  itemGapY: Nullable<string>;

  /**
   * The accordion items.
   */
  items: AccordionItem[];

  /** TailwindCSS format - The font style of the accordion item's header
   * - e.g. font-sans
   */
  headerFont: string;

  /** TailwindCSS format - The text size of the accordion item's header
   * - e.g. text-base
   */
  headerTextSize: string;

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

  /**
   * The position of item icon.
   */
  bgIconPosition: Nullable<string>;

  /**
   * Whether enable header's icon or not.
   */
  enableHeaderIcon: boolean;
};

const AccordionBase = (props: AccordionBaseProps) => {
  const {
    type,
    activeIndex,
    setActiveIndex,
    items,
    itemGapY,
    bgIconPosition,
    enableHeaderIcon,
    width,
    ...headerStyle
  } = props;

  return (
    <div className={cn("flex flex-col", itemGapY, width)}>
      {items.map((e, i) => (
        <div
          key={e.header}
          className={cn(
            "flex flex-col overflow-hidden",
            type === "withIcon" ? "relative" : ""
          )}
        >
          {type === "withIcon" ? (
            <div
              onClick={() => setActiveIndex(i)}
              className={cn("flex absolute cursor-pointer", bgIconPosition)}
            >
              {e.bgIcon}
            </div>
          ) : null}
          <div
            onClick={() => setActiveIndex(i)}
            className={cn(
              "flex flex-row cursor-pointer",
              headerStyle.headerPadding,
              i === activeIndex
                ? e.headerActiveBgColor
                : e.headerInActiveBgColor
            )}
          >
            <div
              className={cn(
                "mr-auto",
                headerStyle.headerFont,
                headerStyle.headerTextSize,
                headerStyle.headerFontWeight,
                i === activeIndex
                  ? e.headerActiveTextColor
                  : e.headerInActiveTextColor
              )}
            >
              {e.header}
            </div>
            {enableHeaderIcon ? (
              <>
                {i === activeIndex
                  ? headerStyle.headerActiveIcon
                  : headerStyle.headerInActiveIcon}
              </>
            ) : null}
          </div>
          <div className="w-full">
            <div className={i === activeIndex ? "flex" : "hidden"}>
              {e.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionBase;
