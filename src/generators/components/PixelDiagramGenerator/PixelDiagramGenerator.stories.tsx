import { Meta } from "@storybook/react";
import { pixelGeneratorInfo } from "../../utils/pixel";
import PixelDiagramGenerator, {
  PixelDiagramGeneratorProps,
} from "./PixelDiagramGenerator";

const meta: Meta<typeof PixelDiagramGenerator> = {
  title: "Components/Generators/Pixel/PixelDiagramGenerator",
  component: PixelDiagramGenerator,
};

export default meta;

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
