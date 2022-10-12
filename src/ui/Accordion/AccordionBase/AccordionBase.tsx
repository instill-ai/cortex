import React from "react";
import cn from "clsx";
import { Nullable } from "../../../types/general";
import AccordionBlock, {
  AccordionBlockHeaderStyleProps,
} from "./AccordionBlock";

export type AccrodionItem = {
  header: string;
  content: Nullable<React.ReactNode>;
  bgColor: string;
  icon: Nullable<React.ReactElement>;
};

export type AccordionBaseProps = {
  type: "bigIcon" | "basic";
  items: AccrodionItem[];
  contentWidth: string;
  enableHeaderIcon: boolean;
  initialOpenIndex: Nullable<number>;
  blockIconPosition: Nullable<string>;
  itemGapY: Nullable<string>;
} & AccordionBlockHeaderStyleProps;

const AccordionBase = (props: AccordionBaseProps) => {
  const {
    type,
    initialOpenIndex,
    items,
    enableHeaderIcon,
    blockIconPosition,
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
        <AccordionBlock
          {...headerStyle}
          key={item.header}
          type={type}
          contentWidth={contentWidth}
          blockIcon={item.icon}
          blockIconPosition={blockIconPosition}
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
