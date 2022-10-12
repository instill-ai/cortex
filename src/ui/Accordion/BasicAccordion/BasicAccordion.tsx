import { MinusIcon, PlusIcon } from "../../Icons";
import AccordionBase, { AccordionBaseProps } from "../AccordionBase";
import { AccordionItemHeaderStyleProps } from "../AccordionBase/AccordionItem";

export type BasicAccordionRequiredKeys =
  | "items"
  | "enableHeaderIcon"
  | "initialOpenIndex";

export type BasicAccordionOmitKeys =
  | "type"
  | "contentWidth"
  | "itemIconContainerPosition"
  | keyof Omit<
      AccordionItemHeaderStyleProps,
      "headerTextColor" | "headerBgColor"
    >;

export type BasicAccordionConfig = Pick<
  AccordionBaseProps,
  BasicAccordionOmitKeys
>;

export type FullBasicAccordionProps = Omit<
  AccordionBaseProps,
  BasicAccordionOmitKeys
>;

export type BasicAccordionRequiredProps = Pick<
  FullBasicAccordionProps,
  BasicAccordionRequiredKeys
>;

export type BasicAccordionOptionalProps = Partial<
  Omit<FullBasicAccordionProps, BasicAccordionRequiredKeys>
>;

export type BasicAccordionProps = BasicAccordionRequiredProps &
  BasicAccordionOptionalProps;

const BasicAccordion = (props: BasicAccordionProps) => {
  const headerIconStyle = {
    width: "w-[30px]",
    height: "h-[30px]",
    color: "fill-white",
    position: "my-auto",
  };

  const config: BasicAccordionConfig = {
    type: "basic",
    contentWidth: null,
    headerFont: "font-sans",
    headerFontWeight: "font-medium",
    headerTextSize: "text-2xl",
    headerPadding: "p-5",
    headerActiveIcon: <MinusIcon {...headerIconStyle} />,
    headerInActiveIcon: <PlusIcon {...headerIconStyle} />,
    itemIconContainerPosition: null,
  };

  return (
    <AccordionBase
      items={props.items}
      enableHeaderIcon={props.enableHeaderIcon}
      initialOpenIndex={props.initialOpenIndex}
      itemGapY={props.itemGapY ?? null}
      {...config}
    />
  );
};

export default BasicAccordion;
