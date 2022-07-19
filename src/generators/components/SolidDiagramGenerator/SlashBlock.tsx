import { FC, useEffect } from "react";
import { prepareCanvas } from "../../utils/common";
import {
  constructSlashTriangleBlock,
  solidGeneratorInfo,
} from "../../utils/solid";

export const SlashBlock: FC = () => {
  const id = "generator-canvas-slash-block";
  useEffect(() => {
    const { ctx } = prepareCanvas(id, solidGeneratorInfo);
    constructSlashTriangleBlock(
      ctx,
      solidGeneratorInfo.canvasPadding,
      solidGeneratorInfo.canvasPadding,
      solidGeneratorInfo
    );
  }, []);

  return <canvas id={id} />;
};
