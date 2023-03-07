import { Nullable } from "../type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ConfigureModelFormState = {
  description: Nullable<string>;
  formIsDirty: boolean;
};

export type ConfigureModelFormAction = {
  setDescription: (description: Nullable<string>) => void;
  setFormIsDirty: (isDirty: boolean) => void;
  initConfigureModelFormStore: () => void;
};

export const configureModelFormInitialState: ConfigureModelFormState = {
  description: null,
  formIsDirty: false,
};

export const useConfigureModelFormStore = create<
  ConfigureModelFormState & ConfigureModelFormAction
>()(
  devtools((set) => ({
    ...configureModelFormInitialState,
    initConfigureModelFormStore: () => set(configureModelFormInitialState),
    setDescription: (description: Nullable<string>) =>
      set({
        description,
        formIsDirty: true,
      }),
    setFormIsDirty: (isDirty: boolean) =>
      set({
        formIsDirty: isDirty,
      }),
  }))
);
