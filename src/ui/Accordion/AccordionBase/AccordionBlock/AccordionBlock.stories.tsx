import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { PipelineIcon } from "../../../Icons";
import AccordionBlock from "./AccordionBlock";

export default {
  title: "Components/Base/AccordionBase/AccordionBlock",
  component: AccordionBlock,
} as ComponentMeta<typeof AccordionBlock>;

const Template: ComponentStory<typeof AccordionBlock> = (args) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <AccordionBlock
      {...args}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    />
  );
};

export const Playground: ComponentStory<typeof AccordionBlock> = Template.bind(
  {}
);

Playground.args = {
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
  blockIcon: (
    <PipelineIcon
      width="w-[250px]"
      height="h-[250px]"
      color="fill-white"
      position="m-auto"
    />
  ),
  blockIconPosition: "top-0 -right-20",
};
