import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  DataDestinationIcon,
  DataSourceIcon,
  MinusIcon,
  ModelIcon,
  PipelineIcon,
  PlusIcon,
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
  position: "top-0 -right-20",
};

const headerIconStyle = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-white",
  position: "my-auto",
};

Playground.args = {
  type: "withIcon",
  contentWidth: "w-7/12",
  itemIconContainerPosition: "top-0 -right-20",
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
      headerBgColor: "bg-[#23C4E7]",
      contentBgColor: "bg-[#23C4E7]",
      headerTextColor: "text-white",
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
      headerBgColor: "bg-[#02D085]",
      contentBgColor: "bg-[#02D085]",
      headerTextColor: "text-white",
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
      headerBgColor: "bg-[#DEC800]",
      contentBgColor: "bg-[#DEC800]",
      headerTextColor: "text-white",
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
      headerBgColor: "bg-[#FF8A00]",
      contentBgColor: "bg-[#FF8A00]",
      headerTextColor: "text-white",
      icon: <DataDestinationIcon {...iconStyle} />,
    },
  ],
  initialOpenIndex: 0,
  enableHeaderIcon: true,
  headerFont: "font-sans",
  headerTextSize: "text-2xl",
  headerFontWeight: "font-medium",
  headerPadding: "p-5",
  headerActiveIcon: <MinusIcon {...headerIconStyle} />,
  headerInActiveIcon: <PlusIcon {...headerIconStyle} />,
};
