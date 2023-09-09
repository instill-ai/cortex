import * as React from "react";
import { UseFormReturn } from "react-hook-form";

export type Nullable<T> = T | null;

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type UseCustomHookResult<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
];

export type InstillAiUserCookie = {
  cookie_token: string;
};

export type GeneralUseFormReturn = UseFormReturn<
  { [k: string]: any },
  any,
  undefined
>;

export type GeneralRecord = Record<string, any>;
