import React from "react";
import cn from "clsx";
import { Nullable } from "../../../types/general";
import AccordionItem, { AccordionItemHeaderStyleProps } from "./AccordionItem";

export type AccordionBaseProps = {
  type: "withIcon" | "basic";
  items: {
    header: string;
    content: Nullable<React.ReactNode>;
    bgColor: string;
    icon: Nullable<React.ReactElement>;
  }[];
  contentWidth: string;
  enableHeaderIcon: boolean;
  initialOpenIndex: Nullable<number>;
  itemIconPosition: Nullable<string>;
  itemGapY: Nullable<string>;
} & AccordionItemHeaderStyleProps;

const AccordionBase = (props: AccordionBaseProps) => {
  const {
    type,
    initialOpenIndex,
    items,
    enableHeaderIcon,
    itemIconPosition,
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
          itemIconPosition={itemIconPosition}
          header={item.header}
          enableHeaderIcon={enableHeaderIcon}
          bgColor={item.bgColor}
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
