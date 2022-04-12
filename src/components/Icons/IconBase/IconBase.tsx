import { FC } from "react";
import cn from "clsx";

export interface IconBaseProps {
  /** The viewbox of target icon
   * - e.g. "0 0 32 32"
   */
  viewBox: string;

  /** TailwindCSS format - The width of icon. */
  width: string;

  /** TailwindCSS format - The height of icon. */
  height: string;

  /** TailwindCSS format - The color of icon.
   * - Please use text color to modify icon's color
   * - e.g. text-gray-300
   */
  color?: string;

  /** TailwindCSS format - The position of icon.
   * - Please use margin auto to control the position of icon
   */
  position: string;

  /** TailwindCSS format - The rotation of icon */
  rotate?: string;

  /** Svg fill attribute
   * - If present, IconBase won't have fill-current class
   */
  fill?: string;
}

const IconBase: FC<IconBaseProps> = ({
  viewBox,
  children,
  width,
  height,
  color,
  position,
  rotate,
  fill,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={cn(
        "flex",
        fill ? "" : "fill-current",
        width,
        height,
        color,
        position,
        rotate
      )}
      fill={fill}
    >
      {children}
    </svg>
  );
};

export default IconBase;
