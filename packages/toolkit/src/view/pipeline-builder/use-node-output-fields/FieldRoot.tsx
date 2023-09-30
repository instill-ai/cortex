import * as React from "react";
import { Nullable } from "../../../lib";

export const ConnectorNodeFieldRoot = ({
  key,
  title,
  children,
}: {
  key: string;
  title: Nullable<string>;
  children: React.ReactNode;
}) => {
  return (
    <div
      key={key}
      className="flex  w-full flex-row flex-wrap gap-2 rounded-[6px] bg-semantic-bg-primary p-2"
    >
      <p className="text-semantic-fg-secondary product-body-text-4-semibold">
        {title}
      </p>
      {children}
    </div>
  );
};

export const EndNodeFieldRoot = ({
  key,
  title,
  children,
}: {
  key: string;
  title: Nullable<string>;
  children: React.ReactNode;
}) => {
  return (
    <div
      key={key}
      className="flex w-full flex-col gap-y-2 rounded-[6px] bg-semantic-bg-primary p-2"
    >
      <p className="text-semantic-fg-primary product-body-text-3-semibold">
        {title}
      </p>
      {children}
    </div>
  );
};
