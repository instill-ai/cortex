import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  DataDestinationIcon,
  DataSourceIcon,
  ModelIcon,
  PipelineIcon,
} from "../../Icons";
import AccordionBase from "./AccordionBase";

export default {
  title: "Components/Base/AccordionBase",
  component: AccordionBase,
} as ComponentMeta<typeof AccordionBase>;

const Template: ComponentStory<typeof AccordionBase> = (args) => (
  <AccordionBase {...args} />
);

export const Playground: ComponentStory<typeof AccordionBase> = Template.bind(
  {}
);

const iconStyle = {
  width: "w-[250px]",
  height: "h-[250px]",
  color: "fill-white opacity-60",
  position: "m-auto",
};

Playground.args = {
  type: "withIcon",
  itemIconPosition: "top-0 -right-20",
  contentWidth: "w-7/12",
  items: [
    {
      header: "Pipeline",
      content: (
        <div className="flex flex-col p-5">
          <div className="flex text-base text-white">
            An end-to-end workflow that automates a sequence of sub-components
            to process visual data.
          </div>
        </div>
      ),
      bgColor: "bg-[#23C4E7]",
      icon: <PipelineIcon {...iconStyle} />,
    },
    {
      header: "Source",
      content: (
        <div className="flex flex-col p-5">
          <div className="flex text-base text-white">
            A data connector in charge of ingesting unstructured visual data
            into a Pipeline.
          </div>
        </div>
      ),
      bgColor: "bg-[#02D085]",
      icon: <DataSourceIcon {...iconStyle} />,
    },
    {
      header: "Model",
      content: (
        <div className="flex flex-col p-5">
          <div className="flex text-base text-white">
            An algorithm that runs on unstructured visual data to solve a
            certain Computer Vision (CV) Task.
          </div>
        </div>
      ),
      bgColor: "bg-[#DEC800]",
      icon: <ModelIcon {...iconStyle} />,
    },
    {
      header: "Destination",
      content: (
        <div className="flex flex-col p-5">
          <div className="flex text-base text-white">
            A data connector to load the standarised CV Task output from Model
            to the destination.
          </div>
        </div>
      ),
      bgColor: "bg-[#FF8A00]",
      icon: <DataDestinationIcon {...iconStyle} />,
    },
  ],
  initialOpenIndex: 0,
  enableHeaderIcon: true,
  headerFont: "font-sans",
  headerTextSize: "text-2xl",
  headerFontWeight: "font-medium",
  headerTextColor: "text-white",
  headerPadding: "p-5",
  headerIconWidth: "w-[30px]",
  headerIconHeight: "h-[30px]",
  headerIconColor: "fill-white",
  headerIconPosition: "my-auto",
};
