import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicAccordion from "./BasicAccordion";

export default {
  title: "Components/Ui/Accordion/BasicAccordion",
  component: BasicAccordion,
} as ComponentMeta<typeof BasicAccordion>;

const Template: ComponentStory<typeof BasicAccordion> = (args) => (
  <BasicAccordion {...args} />
);

export const Playground: ComponentStory<typeof BasicAccordion> = Template.bind(
  {}
);

Playground.args = {
  enableHeaderIcon: true,
  initialActiveIndex: 0,
  items: [
    {
      header: "Pipeline",
      content: (
        <div className="bg-[#23C4E7] w-full">
          <div className="flex flex-col p-5 bg-[#23C4E7] w-full">
            <div className="flex text-base text-white">
              An end-to-end workflow that automates a sequence of sub-components
              to process visual data.
            </div>
          </div>
        </div>
      ),
      headerActiveBgColor: "bg-[#23C4E7]",
      headerInActiveBgColor: "bg-[#23C4E7]",
      headerActiveTextColor: "text-white",
      headerInActiveTextColor: "text-instillGrey30",
    },
    {
      header: "Source",
      content: (
        <div className="bg-[#02D085] w-full">
          <div className="flex flex-col p-5 w-full">
            <div className="flex text-base text-white">
              A data connector in charge of ingesting unstructured visual data
              into a Pipeline.
            </div>
          </div>
        </div>
      ),
      headerActiveBgColor: "bg-[#02D085]",
      headerInActiveBgColor: "bg-[#02D085]",
      headerActiveTextColor: "text-white",
      headerInActiveTextColor: "text-instillGrey30",
    },
    {
      header: "Model",
      content: (
        <div className="bg-[#DEC800] w-full">
          <div className="flex flex-col p-5 bg-[#DEC800] w-full">
            <div className="flex text-base text-white">
              An algorithm that runs on unstructured visual data to solve a
              certain Computer Vision (CV) Task.
            </div>
          </div>
        </div>
      ),
      headerActiveBgColor: "bg-[#DEC800]",
      headerInActiveBgColor: "bg-[#DEC800]",
      headerActiveTextColor: "text-white",
      headerInActiveTextColor: "text-instillGrey30",
    },
    {
      header: "Destination",
      content: (
        <div className="bg-[#FF8A00] w-full">
          <div className="flex flex-col p-5 bg-[#FF8A00] w-full">
            <div className="flex text-base text-white">
              A data connector to load the standarised CV Task output from Model
              to the destination.
            </div>
          </div>
        </div>
      ),
      headerActiveBgColor: "bg-[#FF8A00]",
      headerInActiveBgColor: "bg-[#FF8A00]",
      headerActiveTextColor: "text-white",
      headerInActiveTextColor: "text-instillGrey30",
    },
  ],
};
