import { ComponentMeta } from "@storybook/react";
import { pixelGeneratorInfo } from "../../utils/pixel";
import PixelDiagramGenerator, {
  PixelDiagramGeneratorProps,
} from "./PixelDiagramGenerator";

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

const Template = ({
  blockSize,
  blockBaseColor,
  baseStrokeColor,
  baseStrokeWidth,
  canvasPadding,
  metricType,
}: PixelDiagramGeneratorProps["generatorInfo"]) => {
  return (
    <PixelDiagramGenerator
      generatorInfo={{
        blockSize,
        blockBaseColor,
        baseStrokeColor,
        baseStrokeWidth,
        canvasPadding,
        metricType,
        downloadWhenGenerate: pixelGeneratorInfo.downloadWhenGenerate,
        rowCount: pixelGeneratorInfo.rowCount,
        columnCount: pixelGeneratorInfo.columnCount,
        colorArray: pixelGeneratorInfo.colorArray,
        blockTypeCount: pixelGeneratorInfo.blockTypeCount,
      }}
    />
  );
};

export const Playground = Template.bind({});
