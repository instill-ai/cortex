import { Nullable } from "../types/general";
import * as React from "react";
import cn from "clsx";

export type FormRootProps = {
  marginBottom: Nullable<string>;
  formLess: boolean;
  width: Nullable<string>;
  children?: React.ReactNode;
};

export const FormRoot = ({
  children,
  marginBottom,
  formLess,
  width,
}: FormRootProps) => {
  const submitHandler = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
    []
  );

  return formLess ? (
    <div
      className={cn("flex flex-col", marginBottom, width ? width : "w-full")}
    >
      {children}
    </div>
  ) : (
    <form
      onSubmit={submitHandler}
      className={cn("flex flex-col", marginBottom, width ? width : "w-full")}
      noValidate={true}
    >
      {children}
    </form>
  );
};
