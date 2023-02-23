import { FC, useEffect } from "react";
import { prepareCanvas } from "../../utils/common";
import {
  constructBackslashTriangleBlock,
  solidGeneratorInfo,
} from "../../utils/solid";

export const BackSlashBlock: FC = () => {
  const id = "generator-canvas-back-slash-block";

  useEffect(() => {
    const { ctx } = prepareCanvas(id, solidGeneratorInfo);
    constructBackslashTriangleBlock(
      ctx,
      solidGeneratorInfo.canvasPadding,
      solidGeneratorInfo.canvasPadding,
      solidGeneratorInfo
    );
  }, []);

  return <canvas id={id} />;
};
