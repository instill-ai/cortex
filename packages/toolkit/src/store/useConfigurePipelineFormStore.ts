import { Nullable } from "../type";
import { z } from "zod";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const configurePipelineFormSchema = z.object({
  canEdit: z.boolean(),
  pipelineDescription: z.nullable(z.string()),
});

export const validateConfigurePipelineFormSchema = (value: any) =>
  configurePipelineFormSchema.parse(value);

export type ConfigurePipelineFormFields = z.infer<
  typeof configurePipelineFormSchema
>;

export type ConfigurePipelineFormState = {
  formIsDirty: boolean;
  fields: ConfigurePipelineFormFields;
  errors: Record<keyof ConfigurePipelineFormFields, Nullable<string>>;
};

export type ConfigurePipelineFormAction = {
  setFormIsDirty: (isDirty: boolean) => void;
  init: () => void;
  setFieldError: (
    fieldName: keyof ConfigurePipelineFormState["errors"],
    value: Nullable<string>
  ) => void;
  setFieldValue: <T extends keyof ConfigurePipelineFormFields>(
    fieldName: T,
    value: ConfigurePipelineFormFields[T]
  ) => void;
};

export type ConfigurePipelineFormStore = ConfigurePipelineFormState &
  ConfigurePipelineFormAction;

export const configurePipelineFormInitialState: ConfigurePipelineFormState = {
  formIsDirty: false,
  fields: {
    pipelineDescription: null,
    canEdit: false,
  },
  errors: {
    pipelineDescription: null,
    canEdit: null,
  },
};

export const useConfigurePipelineFormStore =
  create<ConfigurePipelineFormStore>()(
    immer(
      devtools((set) => ({
        ...configurePipelineFormInitialState,
        init: () => set(configurePipelineFormInitialState),
        setFormIsDirty: (isDirty: boolean) =>
          set({
            formIsDirty: isDirty,
          }),
        setFieldError: (fieldName, value) =>
          set((state) => {
            state.errors[fieldName] = value;
          }),
        setFieldValue: (fieldName, value) =>
          set((state) => {
            state.fields[fieldName] = value;
          }),
      }))
    )
  );
