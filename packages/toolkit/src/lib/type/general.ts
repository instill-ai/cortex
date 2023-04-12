import * as React from "react";

export type Nullable<T> = T | null;

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type UseCustomHookResult<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>
];

export type InstillAiUserCookie = {
  cookie_token: string;
};
