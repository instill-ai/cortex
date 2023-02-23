import { FC, useEffect } from "react";
import { prepareCanvas } from "../../utils/common";
import {
  constructPixelBaseBlock,
  constructPixelBlockOutline,
  generateTwoLayerRandomPixelMetric,
  pixelGeneratorInfo,
} from "../../utils/pixel";

const PixelBaseBlock: FC = () => {
  const id = "pixel-base-block";

  useEffect(() => {
    const { ctx } = prepareCanvas(id, pixelGeneratorInfo);
    const metric = generateTwoLayerRandomPixelMetric();
    constructPixelBaseBlock(metric, ctx, pixelGeneratorInfo, 10, 10);
    constructPixelBlockOutline(ctx, pixelGeneratorInfo, 10, 10);
  }, []);

  return (
    <div>
      <canvas id={id} />
    </div>
  );
};

export default PixelBaseBlock;
