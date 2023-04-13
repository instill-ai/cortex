import cn from "clsx";
import * as React from "react";
import type { Nullable } from "../../../lib";

export type CardBaseProps = {
  title: Nullable<string>;
  children?: React.ReactNode;
  marginBottom: Nullable<string>;
};

export const CardBase = ({ title, children, marginBottom }: CardBaseProps) => {
  return (
    <>
      <style>
        {`
          .select-model-preset-card {
            box-shadow: 0px 8px 8px rgba(16, 24, 40, 0.03);
          }
        `}
      </style>
      <div className={cn("flex flex-col w-full", marginBottom)}>
        {title ? (
          <p className="mb-2 text-black text-instill-body">{title}</p>
        ) : null}
        <div className="select-model-preset-card border-1 flex flex-col border-instillGrey20 bg-white">
          {children}
        </div>
      </div>
    </>
  );
};
