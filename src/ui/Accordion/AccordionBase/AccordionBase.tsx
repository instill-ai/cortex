import React from "react";
import cn from "clsx";
import { Nullable } from "../../../types/general";
import AccordionItem, { AccordionItemHeaderStyleProps } from "./AccordionItem";

export type AccordionBaseProps = {
  type: "withIcon" | "basic";
  items: {
    header: string;
    content: Nullable<React.ReactNode>;
    headerTextColor: string;
    headerBgColor: string;
    contentBgColor: string;
    icon: Nullable<React.ReactElement>;
  }[];
  enableHeaderIcon: boolean;
  contentWidth: Nullable<string>;
  initialOpenIndex: Nullable<number>;
  itemIconContainerPosition: Nullable<string>;
  itemGapY: Nullable<string>;
} & Omit<AccordionItemHeaderStyleProps, "headerTextColor" | "headerBgColor">;

const AccordionBase = (props: AccordionBaseProps) => {
  const {
    type,
    initialOpenIndex,
    items,
    enableHeaderIcon,
    itemIconContainerPosition,
    contentWidth,
    itemGapY,
    ...headerStyle
  } = props;

  const [activeIndex, setActiveIndex] = React.useState<number>(
    initialOpenIndex ? initialOpenIndex : 0
  );

  return (
    <div className={cn("flex flex-col", itemGapY)}>
      {items.map((item, i) => (
        <AccordionItem
          {...headerStyle}
          key={item.header}
          type={type}
          contentWidth={contentWidth}
          itemIcon={item.icon}
          itemIconContainerPosition={itemIconContainerPosition}
          header={item.header}
          enableHeaderIcon={enableHeaderIcon}
          headerBgColor={item.headerBgColor}
          headerTextColor={item.headerTextColor}
          contentBgColor={item.contentBgColor}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          selfIndex={i}
          content={item.content}
        />
      ))}
    </div>
  );
};

export default AccordionBase;
