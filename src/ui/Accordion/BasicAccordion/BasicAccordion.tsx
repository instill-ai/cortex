import { MinusIcon, PlusIcon } from "../../Icons";
import AccordionBase, { AccordionBaseProps } from "../AccordionBase";

type BasicAccordionRequiredKeys =
  | "enableHeaderIcon"
  | "items"
  | "activeIndex"
  | "setActiveIndex";

type BasicAccordionOmitKeys =
  | "type"
  | "headerFont"
  | "headerFontWeight"
  | "headerTextSize"
  | "headerPadding"
  | "headerActiveIcon"
  | "headerInActiveIcon"
  | "bgIconPosition";

type BasicAccordionConfig = Pick<AccordionBaseProps, BasicAccordionOmitKeys>;

type FullBasicAccordionProps = Omit<AccordionBaseProps, BasicAccordionOmitKeys>;

type BasicAccordionRequiredProps = Pick<
  FullBasicAccordionProps,
  BasicAccordionRequiredKeys
>;

type BasicAccordionOptionalProps = Partial<
  Omit<FullBasicAccordionProps, BasicAccordionRequiredKeys>
>;

export type BasicAccordionProps = BasicAccordionRequiredProps &
  BasicAccordionOptionalProps;

const BasicAccordion = (props: BasicAccordionProps) => {
  const { items, itemGapY, activeIndex, setActiveIndex, enableHeaderIcon } =
    props;

  const headerIconStyle = {
    width: "w-[30px]",
    height: "h-[30px]",
    color: "fill-white",
    position: "my-auto",
  };

  const config: BasicAccordionConfig = {
    type: "basic",
    headerFont: "font-sans",
    headerFontWeight: "font-medium",
    headerTextSize: "text-2xl",
    headerPadding: "p-5",
    headerActiveIcon: <MinusIcon {...headerIconStyle} />,
    headerInActiveIcon: <PlusIcon {...headerIconStyle} />,
    bgIconPosition: null,
  };

  return (
    <AccordionBase
      items={items}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      itemGapY={itemGapY ?? null}
      enableHeaderIcon={enableHeaderIcon}
      {...config}
    />
  );
};

export default BasicAccordion;
