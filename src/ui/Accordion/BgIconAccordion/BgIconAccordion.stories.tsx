import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import {
  DataDestinationIcon,
  DataSourceIcon,
  ModelIcon,
  PipelineIcon,
} from "../../Icons";
import BgIconAccordion from "./BgIconAccordion";

export default {
  title: "Components/Ui/Accordion/BgIconAccordion",
  component: BgIconAccordion,
} as ComponentMeta<typeof BgIconAccordion>;

const Template: ComponentStory<typeof BgIconAccordion> = (args) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <BgIconAccordion
      {...args}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    />
  );
};

export const Playground: ComponentStory<typeof BgIconAccordion> = Template.bind(
  {}
);

const bgIconStyle = {
  width: "w-[250px]",
  height: "h-[250px]",
  color: "fill-white opacity-60",
  position: "m-auto",
};

Playground.args = {
  enableHeaderIcon: true,
  bgIconPosition: "top-0 -right-20",
  items: [
    {
      header: "Pipeline",
      content: (
        <div className="bg-[#285863] w-full">
          <div className="flex flex-col p-5 w-7/12">
            <div className="flex text-base text-white">
              An end-to-end workflow that automates a sequence of sub-components
              to process visual data.
            </div>
          </div>
        </div>
      ),
      headerActiveBgColor: "bg-instillNeonBlue",
      headerInActiveBgColor: "bg-[#2596AE]",
      headerActiveTextColor: "text-white",
      headerInActiveTextColor: "text-instillGrey30",
      bgIcon: <PipelineIcon {...bgIconStyle} />,
    },
    {
      header: "Source",
      content: (
        <div className="bg-[#285863] w-full">
          <div className="flex flex-col p-5 w-7/12">
            <div className="flex text-base text-white">
              A data connector in charge of ingesting unstructured visual data
              into a Pipeline.
            </div>
          </div>
        </div>
      ),
      headerActiveBgColor: "bg-instillNeonBlue",
      headerInActiveBgColor: "bg-[#2596AE]",
      headerActiveTextColor: "text-white",
      headerInActiveTextColor: "text-instillGrey30",
      bgIcon: <DataSourceIcon {...bgIconStyle} />,
    },
    {
      header: "Model",
      content: (
        <div className="bg-[#285863] w-full">
          <div className="flex flex-col p-5 w-7/12">
            <div className="flex text-base text-white">
              An algorithm that runs on unstructured visual data to solve a
              certain Computer Vision (CV) Task.
            </div>
          </div>
        </div>
      ),
      headerActiveBgColor: "bg-instillNeonBlue",
      headerInActiveBgColor: "bg-[#2596AE]",
      headerActiveTextColor: "text-white",
      headerInActiveTextColor: "text-instillGrey30",
      bgIcon: <ModelIcon {...bgIconStyle} />,
    },
    {
      header: "Destination",
      content: (
        <div className="bg-[#285863] w-full">
          <div className="flex flex-col p-5 w-7/12">
            <div className="flex text-base text-white">
              A data connector to load the standarised CV Task output from Model
              to the destination.
            </div>
          </div>
        </div>
      ),
      headerActiveBgColor: "bg-instillNeonBlue",
      headerInActiveBgColor: "bg-[#2596AE]",
      headerActiveTextColor: "text-white",
      headerInActiveTextColor: "text-instillGrey30",
      bgIcon: <DataDestinationIcon {...bgIconStyle} />,
    },
  ],
};
