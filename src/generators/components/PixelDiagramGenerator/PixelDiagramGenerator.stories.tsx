import { ComponentMeta, ComponentStory } from "@storybook/react";
import { initGeneratorInfo } from "../../utils/pixel";
import PixelDiagramGenerator from "./PixelDiagramGenerator";

export default {
  title: "Components/Generators/Pixel/PixelDiagramGenerator",
  component: PixelDiagramGenerator,
  argTypes: {
    blockSize: {
      defaultValue: 300,
      control: { type: "range", min: 120, max: 600, step: 30 },
    },
    blockBaseColor: {
      defaultValue: "#000000",
      control: {
        type: "color",
        presetColors: [
          {
            color: "#000000",
            title: "black",
          },
        ],
      },
    },
    baseStrokeColor: {
      defaultValue: "#374151",
      control: {
        type: "color",
        presetColors: [
          {
            color: "#374151",
            title: "black",
          },
        ],
      },
    },
    baseStrokeWidth: {
      defaultValue: 10,
      control: { type: "range", min: 1, max: 50, step: 1 },
    },
    // rowCount: {
    //   control: {
    //     type: "number",
    //   },
    // },
    // columnCount: {
    //   control: {
    //     type: "number",
    //   },
    // },
    canvasPadding: {
      defaultValue: 20,
      control: { type: "range", min: 8, max: 52, step: 4 },
    },
    metricType: {
      defaultValue: "TwoLayerRandom",
      options: ["FullRandom", "TwoLayerRandom"],
      control: { type: "radio" },
    },
    downloadImage: {
      defaultValue: false,
      control: { type: "boolean" },
    },
  },
} as ComponentMeta<typeof PixelDiagramGenerator>;

const Template: ComponentStory<typeof PixelDiagramGenerator> = (args) => {
  return (
    <PixelDiagramGenerator
      {...args}
      generatorInfo={{
        ...args.generatorInfo,
        rowCount: initGeneratorInfo.rowCount,
        columnCount: initGeneratorInfo.columnCount,
        colorArray: initGeneratorInfo.colorArray,
        blockTypeCount: initGeneratorInfo.blockTypeCount,
      }}
    />
  );
};

export const Playground: ComponentStory<typeof PixelDiagramGenerator> =
  Template.bind({});
