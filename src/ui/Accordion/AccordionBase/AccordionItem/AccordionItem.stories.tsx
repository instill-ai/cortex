import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { PipelineIcon } from "../../../Icons";
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

Playground.args = {
  type: "basic",
  header: "Pipeline",
  enableHeaderIcon: true,
  headerFont: "font-sans",
  headerTextSize: "text-2xl",
  headerTextColor: "text-white",
  headerPadding: "p-5",
  headerIconWidth: "w-[30px]",
  headerIconHeight: "h-[30px]",
  headerIconColor: "fill-white",
  headerIconPosition: "my-auto",
  bgColor: "bg-instillGrey90",
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
      position="m-auto"
    />
  ),
  itemIconPosition: "top-0 -right-20",
};
