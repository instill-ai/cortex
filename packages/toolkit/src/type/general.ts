import { Dispatch, SetStateAction } from "react";

export type Nullable<T> = T | null;

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type UseCustomHookResult<T> = [T, Dispatch<SetStateAction<T>>];
