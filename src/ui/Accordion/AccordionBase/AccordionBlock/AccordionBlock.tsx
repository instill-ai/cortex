import React from "react";
import cn from "clsx";
import { Nullable } from "../../../../types/general";
import { MinusIcon, PlusIcon } from "../../../Icons";

export type AccordionBlockHeaderStyleProps = {
  headerFont: string;
  headerTextSize: string;
  headerTextColor: string;
  headerFontWeight: string;
  headerPadding: Nullable<string>;
  headerIconWidth: string;
  headerIconHeight: string;
  headerIconColor: string;
  headerIconPosition: string;
};

export type AccordionBlockProps = {
  type: "bigIcon" | "basic";
  header: string;
  enableHeaderIcon: boolean;
  bgColor: string;
  selfIndex: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  content: Nullable<React.ReactNode>;
  blockIcon: Nullable<React.ReactElement>;
  blockIconPosition: Nullable<string>;
  contentWidth: string;
} & AccordionBlockHeaderStyleProps;

const AccordionBlock = (props: AccordionBlockProps) => {
  const {
    type,
    blockIcon,
    blockIconPosition,
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
        type === "bigIcon" ? "relative" : ""
      )}
    >
      {type === "bigIcon" ? (
        <div className={cn("flex absolute z-0", blockIconPosition)}>
          {blockIcon}
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

export default AccordionBlock;
