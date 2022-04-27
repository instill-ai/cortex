export type ElemeentPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const getElementPosition = (element: HTMLElement): ElemeentPosition => {
  const box = element.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const x = box.left + scrollLeft - clientLeft;
  const y = box.top + scrollTop - clientTop;

  return {
    x: x,
    y: y,
    width: box.width,
    height: box.height,
  };
};

export const getTailwindClassNumber = (className: string): number => {
  if (!hasNumber(className)) {
    throw new Error(
      "Tailwind css classNames don't have number, please try to use abitrary classname like w-[10px]"
    );
  }

  if (/\[.*\]/g.test(className)) {
    const matchString = className.match(/\[([^\][]*)]/g);

    if (className.includes("px")) {
      return parseInt(matchString[0].match(/\d+/g)[0]);
    }

    if (className.includes("rem")) {
      return parseInt(matchString[0].match(/\d+/g)[0]) * 4;
    }

    throw new Error(
      `getTailwindClassNumber now only support px and rem, input - ${className}`
    );
  }

  if (className.includes("[") || className.includes("]")) {
    throw new Error(
      `Tailwind css classname is not complete, input - ${className}`
    );
  }

  return parseInt(className.match(/\d+/g)[0]) * 4;
};

function hasNumber(s: string) {
  return /\d/.test(s);
}
