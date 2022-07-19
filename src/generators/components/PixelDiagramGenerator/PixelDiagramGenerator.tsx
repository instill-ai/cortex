import { FC, useEffect, useState } from "react";
import { PixelGeneratorInfo } from "../../types/generator";
import { prepareCanvas } from "../../utils/common";
import {
  constructOptimizePixelDiagram,
  pixelGeneratorInfo,
} from "../../utils/pixel";

export type PixelDiagramGeneratorProps = {
  generatorInfo: PixelGeneratorInfo;
};

const PixelDiagramGenerator: FC<PixelDiagramGeneratorProps> = ({
  generatorInfo = pixelGeneratorInfo,
}) => {
  const [state, updateState] = useState(0);
  const id = "pixel-block-diagram-generator";
  const forceUpdate = () => {
    updateState(state + 1);
  };

  useEffect(() => {
    const { canvas, ctx } = prepareCanvas(id, generatorInfo);
    constructOptimizePixelDiagram(ctx, generatorInfo);
    if (generatorInfo.downloadWhenGenerate) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `branding-diagram-${Date.now()}`;
      link.href = url;
      link.click();
    }
  }, [state, generatorInfo]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="px-[10px]">
        <button
          className="border border-gray-600 px-2 text-sm"
          onClick={forceUpdate}
        >
          refresh-diagram
        </button>
      </div>
      <div>
        <canvas id={id} />
      </div>
    </div>
  );
};

export default PixelDiagramGenerator;
