import { FC, useEffect } from "react";
import { prepareCanvas } from "../../utils/common";
import { constructBlankBlock, solidGeneratorInfo } from "../../utils/solid";

export const BlankBlock: FC = () => {
  const id = "generator-canvas-blank-block";
  useEffect(() => {
    const { ctx } = prepareCanvas(id, solidGeneratorInfo);
    constructBlankBlock(
      ctx,
      solidGeneratorInfo.canvasPadding,
      solidGeneratorInfo.canvasPadding,
      solidGeneratorInfo
    );
  }, []);

  return <canvas id={id} />;
};
