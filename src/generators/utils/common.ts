import { GeneratorInfo } from "../types/generator";

// If max = 2, it will return 0 or 1
export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const getNonDuplicatedRandomInt = (
  max: number,
  oldValue: number
): number => {
  const newValue = Math.floor(Math.random() * max);
  if (newValue !== oldValue) {
    return newValue;
  }

  return getNonDuplicatedRandomInt(max, oldValue);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled;
};

export const prepareCanvas = (
  id: string,
  generatorInfo: GeneratorInfo
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } => {
  const canvas: HTMLCanvasElement = getCanvasElementById(id);

  canvas.width =
    generatorInfo.blockSize * generatorInfo.columnCount +
    generatorInfo.canvasPadding * 2 +
    generatorInfo.baseStrokeWidth * 4;

  canvas.height =
    generatorInfo.blockSize * generatorInfo.rowCount +
    generatorInfo.canvasPadding * 2 +
    generatorInfo.baseStrokeWidth * 4;

  const ctx: CanvasRenderingContext2D = getCanvasRendering2DContext(canvas);

  return {
    canvas,
    ctx,
  };
};

export const getCanvasElementById = (id: string): HTMLCanvasElement => {
  const canvas = document.getElementById(id);

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error(
      `The element of id "${id}" is not a HTMLCanvasElement. Make sure a <canvas id="${id}""> element is present in the document.`
    );
  }

  return canvas;
};

export const getCanvasRendering2DContext = (
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D => {
  const context = canvas.getContext("2d");

  if (context === null) {
    throw new Error(
      "This browser does not support 2-dimensional canvas rendering contexts."
    );
  }

  return context;
};
