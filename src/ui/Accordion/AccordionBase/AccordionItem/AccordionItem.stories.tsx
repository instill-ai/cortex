import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { MinusIcon, PipelineIcon, PlusIcon } from "../../../Icons";
import AccordionItem from "./AccordionItem";

export default {
  title: "Components/Base/AccordionBase/AccordionItem",
  component: AccordionItem,
} as ComponentMeta<typeof AccordionItem>;

const Template: ComponentStory<typeof AccordionItem> = (args) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <AccordionItem
      {...args}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    />
  );
};

export const Playground: ComponentStory<typeof AccordionItem> = Template.bind(
  {}
);

const headerIconStyle = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-white",
  position: "my-auto",
};

Playground.args = {
  type: "withIcon",
  header: "Pipeline",
  enableHeaderIcon: true,
  headerFont: "font-sans",
  headerTextSize: "text-2xl",
  headerTextColor: "text-white",
  headerPadding: "p-5",
  headerBgColor: "bg-instillGrey90",
  contentBgColor: "bg-instillGrey70",
  content: (
    <div className="flex flex-col p-5">
      <div className="flex text-base text-instillGrey15">
        An end-to-end workflow that automates a sequence of sub-components to
        process visual data.
      </div>
    </div>
  ),
  itemIcon: (
    <PipelineIcon
      width="w-[250px]"
      height="h-[250px]"
      color="fill-white"
      position="top-0 -right-20"
    />
  ),
  itemIconContainerPosition: "top-0 -right-20",
  headerActiveIcon: <MinusIcon {...headerIconStyle} />,
  headerInActiveIcon: <PlusIcon {...headerIconStyle} />,
};
