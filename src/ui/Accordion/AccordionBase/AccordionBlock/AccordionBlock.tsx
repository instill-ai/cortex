import React from "react";
import cn from "clsx";
import { Nullable } from "../../../../types/general";
import { MinusIcon, PlusIcon } from "../../../Icons";

export type AccordionBlockHeaderStyleProps = {
  headerFont: string;
  headerTextSize: string;
  headerTextColor: string;
  headerPadding: Nullable<string>;
  headerIconWidth: string;
  headerIconHeight: string;
  headerIconColor: string;
  headerIconPosition: string;
};

export type AccordionBlockProps = {
  header: string;
  enableHeaderIcon: boolean;
  bgColor: string;
  selfIndex: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  content: Nullable<React.ReactNode>;
} & AccordionBlockHeaderStyleProps;

const AccordionBlock = (props: AccordionBlockProps) => {
  const {
    bgColor,
    selfIndex,
    activeIndex,
    setActiveIndex,
    content,
    header,
    enableHeaderIcon,
    headerFont,
    headerTextSize,
    headerTextColor,
    headerPadding,
    headerIconWidth,
    headerIconHeight,
    headerIconColor,
    headerIconPosition,
  } = props;

  const headerIconStyle = {
    width: headerIconWidth,
    height: headerIconHeight,
    color: headerIconColor,
    position: headerIconPosition,
  };

  return (
    <div className={cn("flex flex-col", bgColor)}>
      <div
        onClick={() => setActiveIndex(selfIndex)}
        className={cn("flex flex-row cursor-pointer", headerPadding)}
      >
        <div
          className={cn("mr-auto", headerFont, headerTextSize, headerTextColor)}
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
      {content}
    </div>
  );
};

export default AccordionBlock;
