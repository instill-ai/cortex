import { FC, useEffect } from "react";
import { prepareCanvas } from "../../utils/common";
import {
  constructHorizontalRectBlock,
  solidGeneratorInfo,
} from "../../utils/solid";

export const HorizontalRectBlock: FC = () => {
  const id = "generator-canvas-horizontal-rect-block";
  useEffect(() => {
    const { ctx } = prepareCanvas(id, solidGeneratorInfo);
    constructHorizontalRectBlock(
      ctx,
      solidGeneratorInfo.canvasPadding,
      solidGeneratorInfo.canvasPadding,
      solidGeneratorInfo
    );
  }, []);

  return <canvas id={id} />;
};
