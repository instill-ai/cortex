import * as React from "react";
import { LogoBase, LogoBaseProps } from "./LogoBase";

export const Milvus = React.forwardRef<
  SVGSVGElement,
  Omit<LogoBaseProps, "viewBox" | "children">
>((props, ref) => {
  const { className, ...passThrough } = props;
  return (
    <LogoBase
      {...passThrough}
      ref={ref}
      viewBox="0 0 60 60"
      className={className}
    >
      <path
        d="M40.8108 17.9822C34.1919 11.3393 23.4589 11.3393 16.84 17.9822L6.02162 28.8395C5.38212 29.4821 5.38212 30.5166 6.02162 31.1591L16.84 42.0165C23.4589 48.6594 34.1919 48.6594 40.8108 42.0274C47.4404 35.3953 47.4404 24.6251 40.8108 17.9822ZM38.2528 38.8366C33.3925 43.7153 25.5053 43.7153 20.645 38.8366L12.6832 30.8542C12.2142 30.3859 12.2142 29.6236 12.6832 29.1445L20.6344 21.173C25.4946 16.2942 33.3819 16.2942 38.2421 21.173C43.1131 26.0517 43.1131 33.9579 38.2528 38.8366Z"
        fill="#4FC4F9"
      />
      <path
        d="M54.9864 28.8503L50.2221 23.9825C49.9343 23.6884 49.4546 23.9607 49.5506 24.3636C50.3713 28.0771 50.3713 31.954 49.5506 35.6675C49.4653 36.0704 49.9449 36.3317 50.2221 36.0486L54.9864 31.1808C55.6152 30.5274 55.6152 29.4928 54.9864 28.8503Z"
        fill="#4FC4F9"
      />
      <path
        d="M29.5018 38.5426C34.111 38.5426 37.8474 34.7249 37.8474 30.0157C37.8474 25.3064 34.111 21.4888 29.5018 21.4888C24.8927 21.4888 21.1563 25.3064 21.1563 30.0157C21.1563 34.7249 24.8927 38.5426 29.5018 38.5426Z"
        fill="#4FC4F9"
      />
    </LogoBase>
  );
});
Milvus.displayName = "Milvus";