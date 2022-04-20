import { FC } from "react";
import cn from "clsx";
import "./LoadingStatusBlockBase.css";

export interface LoadingStatusBlockBaseProps {
  /** TailwindCSS format - Loading status block's background color
   * - bg-instillGrey30
   */
  bgColor: string;

  /** TailwindCSS format - Loading status cube's background color */
  cubeColor: string;

  /** Whether it is at loading status */
  isLoading: boolean;

  /** Whether it is error */
  isError: boolean;

  /** Anumation duration */
  animationDuration: number;
}

const LoadingStatusBlockBase: FC<LoadingStatusBlockBaseProps> = ({
  bgColor,
  cubeColor,
  isError,
  isLoading,
  animationDuration,
}) => {
  return (
    <div className={cn("w-[18px] h-[18px] relative", bgColor)}>
      <div
        className={cn(
          "block w-1.5 h-1.5 absolute top-0.5 left-0.5",
          cubeColor,
          { "loading-animation": isError ? false : isLoading }
        )}
        style={{
          animationDuration: isError
            ? ""
            : isLoading
            ? `${animationDuration}s`
            : "",
        }}
      />
    </div>
  );
};

export default LoadingStatusBlockBase;
