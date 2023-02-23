import { FC, useEffect } from "react";
import { prepareCanvas } from "../../utils/common";
import {
  constructVerticalRectBlock,
  solidGeneratorInfo,
} from "../../utils/solid";

export const VerticalRectBlock: FC = () => {
  const id = "generator-canvas-vertical-rect-block";
  useEffect(() => {
    const { ctx } = prepareCanvas(id, solidGeneratorInfo);
    constructVerticalRectBlock(
      ctx,
      solidGeneratorInfo.canvasPadding,
      solidGeneratorInfo.canvasPadding,
      solidGeneratorInfo
    );
  }, []);

  return <canvas id={id} />;
};
