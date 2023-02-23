import { GeneratorInfo } from "../types/generator";
import { getNonDuplicatedRandomInt, getRandomInt } from "./common";

export const generateTargetMetric = (
  solidGeneratorInfo: GeneratorInfo
): number[][] => {
  const row = [];
  for (let i = 0; i < solidGeneratorInfo.rowCount; i++) {
    const column = [];
    for (let j = 0; j < solidGeneratorInfo.columnCount; j++) {
      column[j] = getRandomInt(solidGeneratorInfo.blockTypeCount);
    }
    row[i] = column;
  }
  return row;
};

export const switchBlockConstructor = (
  typeNum: number,
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  solidGeneratorInfo: GeneratorInfo
) => {
  switch (typeNum) {
    case 0: {
      const newPosition = constructVerticalRectBlock(
        ctx,
        x,
        y,
        solidGeneratorInfo
      );
      return {
        x: newPosition.x,
        y: newPosition.y,
      };
    }
    case 1: {
      const newPosition = constructHorizontalRectBlock(
        ctx,
        x,
        y,
        solidGeneratorInfo
      );
      return {
        x: newPosition.x,
        y: newPosition.y,
      };
    }
    case 2: {
      const newPosition = constructBackslashTriangleBlock(
        ctx,
        x,
        y,
        solidGeneratorInfo
      );
      return {
        x: newPosition.x,
        y: newPosition.y,
      };
    }
    case 3: {
      const newPosition = constructSlashTriangleBlock(
        ctx,
        x,
        y,
        solidGeneratorInfo
      );
      return {
        x: newPosition.x,
        y: newPosition.y,
      };
    }
    case 4: {
      const newPosition = constructBlankBlock(ctx, x, y, solidGeneratorInfo);
      return {
        x: newPosition.x,
        y: newPosition.y,
      };
    }
    default: {
      throw new Error(
        `Something went wrong when generate the random num for block metric, there is a invalid index: ${typeNum}`
      );
    }
  }
};

export const constructBlankBlock = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  solidGeneratorInfo: GeneratorInfo
) => {
  const width = solidGeneratorInfo.blockSize;
  const height = solidGeneratorInfo.blockSize;
  const colorLength = solidGeneratorInfo.colorArray.length - 1;
  const randNum: number = getRandomInt(colorLength);

  ctx.fillStyle = solidGeneratorInfo.colorArray[randNum];
  ctx.fillRect(x, y, width, height);

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.strokeRect(x, y, width, height);

  return {
    x: x + solidGeneratorInfo.blockSize,
    y: y,
  };
};

export const constructSlashTriangleBlock = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  solidGeneratorInfo: GeneratorInfo
) => {
  const width = solidGeneratorInfo.blockSize;
  const height = solidGeneratorInfo.blockSize;
  const colorLength = solidGeneratorInfo.colorArray.length - 1;

  let randNum: number = getRandomInt(colorLength);
  ctx.fillStyle = solidGeneratorInfo.colorArray[randNum];
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + width, y);
  ctx.fill();

  randNum = getNonDuplicatedRandomInt(colorLength, randNum);
  ctx.fillStyle = solidGeneratorInfo.colorArray[randNum];
  ctx.beginPath();
  ctx.moveTo(x, y + height);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width, y);
  ctx.fill();

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.beginPath();
  ctx.lineJoin = "round";
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.beginPath();
  ctx.lineJoin = "round";
  ctx.moveTo(x, y + height);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x, y + height);
  ctx.stroke();

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.strokeRect(x, y, width, height);

  return {
    x: x + solidGeneratorInfo.blockSize,
    y: y,
  };
};

export const constructBackslashTriangleBlock = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  solidGeneratorInfo: GeneratorInfo
) => {
  const width = solidGeneratorInfo.blockSize;
  const height = solidGeneratorInfo.blockSize;
  const colorLength = solidGeneratorInfo.colorArray.length - 1;

  // In order to avoid fillrect cover stroke, we draw fillRect then strokeRect

  let randNum: number = getRandomInt(colorLength);
  ctx.fillStyle = solidGeneratorInfo.colorArray[randNum];
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + width, y + height);
  ctx.fill();

  randNum = getNonDuplicatedRandomInt(colorLength, randNum);
  ctx.fillStyle = solidGeneratorInfo.colorArray[randNum];
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width, y + height);
  ctx.fill();

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.beginPath();
  ctx.lineJoin = "round";
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.beginPath();
  ctx.lineJoin = "round";
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width, y + height);
  ctx.moveTo(x, y);
  ctx.stroke();

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.strokeRect(x, y, width, height);

  return {
    x: x + solidGeneratorInfo.blockSize,
    y: y,
  };
};

export const constructVerticalRectBlock = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  solidGeneratorInfo: GeneratorInfo
) => {
  const width = solidGeneratorInfo.blockSize / 2;
  const height = solidGeneratorInfo.blockSize;
  const colorLength = solidGeneratorInfo.colorArray.length - 1;
  let randNum: number = getRandomInt(colorLength);

  // Build fillRect first to make sure stroke won't cover by fillRect
  ctx.fillStyle = solidGeneratorInfo.colorArray[randNum];
  ctx.fillRect(x, y, width, height);

  randNum = getNonDuplicatedRandomInt(colorLength, randNum);
  ctx.fillStyle = solidGeneratorInfo.colorArray[randNum];
  ctx.fillRect(x + width, y, width, height);

  // Build strokeRect

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.strokeRect(x, y, width, height);

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.strokeRect(x + width, y, width, height);

  return {
    x: x + solidGeneratorInfo.blockSize,
    y: y,
  };
};

export const constructHorizontalRectBlock = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  solidGeneratorInfo: GeneratorInfo
) => {
  const width = solidGeneratorInfo.blockSize;
  const height = solidGeneratorInfo.blockSize / 2;
  const colorLength = solidGeneratorInfo.colorArray.length - 1;

  let randNum: number = getRandomInt(colorLength);
  ctx.fillStyle = solidGeneratorInfo.colorArray[randNum];
  ctx.fillRect(x, y, width, height);

  randNum = getNonDuplicatedRandomInt(colorLength, randNum);
  ctx.fillStyle = solidGeneratorInfo.colorArray[randNum];
  ctx.fillRect(x, y + height, width, height);

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.strokeRect(x, y, width, height);

  ctx.lineWidth = solidGeneratorInfo.baseStrokeWidth;
  ctx.strokeStyle = solidGeneratorInfo.baseStrokeColor;
  ctx.strokeRect(x, y + height, width, height);

  return {
    x: x + solidGeneratorInfo.blockSize,
    y: y,
  };
};

export const solidGeneratorInfo: GeneratorInfo = {
  blockSize: 200,
  blockTypeCount: 5,
  baseStrokeColor: "#000000",
  baseStrokeWidth: 4,
  rowCount: 3,
  columnCount: 3,
  canvasPadding: 10,
  colorArray: [
    "#FFFF1A",
    "#FCB21B",
    "#27FC86",
    "#3EEDFF",
    "#F75FFF",
    "#C65AFF",
  ],
};
