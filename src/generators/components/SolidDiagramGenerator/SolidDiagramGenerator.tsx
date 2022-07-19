import { FC, useEffect, useState, useCallback } from "react";
import { prepareCanvas } from "../../utils/common";
import {
  generateTargetMetric,
  solidGeneratorInfo,
  switchBlockConstructor,
} from "../../utils/solid";

export const solidGeneratorColor = {
  yellowSun: "#FFFF1A",
  brightYellow: "#FCB21B",
  guppieGreen: "#27FC86",
  fluorescentBlue: "#3EEDFF",
  shockingPink: "#F75FFF",
  heliotrope: "#C65AFF",
};

const SolidDiagramGenerator: FC = () => {
  const newMetric = generateTargetMetric(solidGeneratorInfo);
  const [metric, setMetric] = useState<number[][]>(newMetric);

  const generateMetric = () => {
    const newMetric = generateTargetMetric(solidGeneratorInfo);
    setMetric(newMetric);
  };

  const generateDiagram = useCallback(() => {
    const { ctx } = prepareCanvas("generator-canvas", solidGeneratorInfo);
    for (let i = 0; i < metric.length; i++) {
      const row = metric[i];
      let x = solidGeneratorInfo.canvasPadding;
      const y =
        i * solidGeneratorInfo.blockSize + solidGeneratorInfo.canvasPadding;
      for (let j = 0; j < row.length; j++) {
        switchBlockConstructor(row[j], ctx, x, y, solidGeneratorInfo);
        if (j !== row.length - 1) {
          x =
            solidGeneratorInfo.blockSize * (j + 1) +
            solidGeneratorInfo.canvasPadding;
        }
      }
    }
  }, [metric]);

  useEffect(() => {
    generateDiagram();
  }, [generateDiagram]);

  const refresh = () => {
    generateMetric();
  };

  return (
    <div className="flex flex-col">
      <div className="px-[10px]">
        <button
          className="border border-gray-600 px-2 text-sm"
          onClick={refresh}
        >
          refresh-diagram
        </button>
      </div>
      <div>
        <canvas id="generator-canvas" />
      </div>
    </div>
  );
};

export default SolidDiagramGenerator;
