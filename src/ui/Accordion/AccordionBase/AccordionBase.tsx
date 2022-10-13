import React from "react";
import cn from "clsx";
import { Nullable } from "../../../types/general";

// In this file you may discover there have some duplications at the header
// style of each accordion item. This is intended to make the code easier to
// read and maintain. We had tried various ways including making the AccordionItem
// component and extract its type. But it all ends up with lots of abstraction
// using typescript Pick, Omit and keyof which are hard to read. We are open
// to any kind of suggestion, but please don't change these codes using DRY
// as its reasoning.

// These duplications will be eliminated at the exported layer components.

export type AccordionItemHeaderStyle = {
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

export type AccordionItem = {
  /**
   * The background icon that will be displayed on the accordion item at a
   * absolute position. Please use bgIconPosition to indicate the
   * position.
   */
  bgIcon: Nullable<React.ReactElement>;

  /**
   * The position of item icon.
   */
  bgIconPosition: Nullable<string>;

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
} & AccordionItemHeaderStyle;

export type AccordionBaseProps = {
  /**
   * We have two type of accordion item right now. `withIcon` will display the
   * specific item icon consumer indicated at a absolute position. `basic` will
   * not display this item icon.
   */
  type: "withIcon" | "basic";

  /**
   * The initial active accordion item's index.
   */
  initialActiveIndex: Nullable<number>;

  /**
   * The gap between each accordion items
   */
  itemGapY: Nullable<string>;

  /**
   * The accordion items.
   */
  items: AccordionItem[];
};

const AccordionBase = (props: AccordionBaseProps) => {
  const { type, initialActiveIndex, items, itemGapY } = props;

  const [activeIndex, setActiveIndex] = React.useState<number>(
    initialActiveIndex ? initialActiveIndex : 0
  );

  return (
    <div className={cn("flex flex-col", itemGapY)}>
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
              className={cn("flex absolute cursor-pointer", e.bgIconPosition)}
            >
              {e.bgIcon}
            </div>
          ) : null}
          <div
            onClick={() => setActiveIndex(i)}
            className={cn(
              "flex flex-row cursor-pointer",
              e.headerPadding,
              e.headerBgColor
            )}
          >
            <div
              className={cn(
                "mr-auto",
                e.headerFont,
                e.headerTextSize,
                e.headerTextColor,
                e.headerFontWeight
              )}
            >
              {e.header}
            </div>
            {e.enableHeaderIcon ? (
              <>
                {i === activeIndex ? e.headerActiveIcon : e.headerInActiveIcon}
              </>
            ) : null}
          </div>
          <div className={cn("w-full", e.contentBgColor)}>
            <div
              className={cn(
                e.contentWidth,
                i === activeIndex ? "flex" : "hidden"
              )}
            >
              {e.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionBase;
