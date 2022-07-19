import { FC, useEffect } from "react";
import { prepareCanvas } from "../../utils/common";
import {
  constructPixelBaseBlock,
  constructPixelBlockOutline,
  generateTwoLayerRandomPixelMetric,
} from "../../utils/pixel";
import { initGeneratorInfo } from "../../pixel/DiagramGenerator";

const PixelBaseBlock: FC = () => {
  const id = "pixel-base-block";

  useEffect(() => {
    const { ctx } = prepareCanvas(id, initGeneratorInfo);
    const metric = generateTwoLayerRandomPixelMetric();
    constructPixelBaseBlock(metric, ctx, initGeneratorInfo, 10, 10);
    constructPixelBlockOutline(ctx, initGeneratorInfo, 10, 10);
  }, []);

  return (
    <div>
      <canvas id={id} />
    </div>
  );
};

export default PixelBaseBlock;
