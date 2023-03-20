import { z } from "zod";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";
import { Nullable } from "../type";

export const createSourceFormFieldsSchema = z.object({
  sourceName: z.nullable(z.string()),
  sourceDefinition: z.nullable(z.string()),
});

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export const validateCreateSourceSchema = (value: any) =>
  createSourceFormFieldsSchema.parse(value);

export type CreateSourceFormFields = z.infer<
  typeof createSourceFormFieldsSchema
>;

export type CreateSourceFormState = {
  formIsDirty: boolean;
  fields: CreateSourceFormFields;
  errors: Record<keyof CreateSourceFormFields, Nullable<string>>;
};

export type CreateSourceFormAction = {
  setFormIsDirty: (isDirty: boolean) => void;
  init: () => void;
  setFieldError: (
    fieldName: keyof CreateSourceFormState["errors"],
    value: Nullable<string>
  ) => void;
  setFieldValue: <T extends keyof CreateSourceFormFields>(
    fieldName: T,
    value: CreateSourceFormFields[T]
  ) => void;
  setFieldsValue: (fields: CreateSourceFormFields) => void;
  setErrorsValue: (errors: CreateSourceFormState["errors"]) => void;
};

export const createSourceFormInitialState: CreateSourceFormState = {
  formIsDirty: false,
  fields: {
    sourceName: null,
    sourceDefinition: null,
  },
  errors: {
    sourceName: null,
    sourceDefinition: null,
  },
};

export type CreateSourceFormStore = CreateSourceFormState &
  CreateSourceFormAction;

export const useCreateSourceFormStore = create<CreateSourceFormStore>()(
  devtools((set) => ({
    ...createSourceFormInitialState,
    init: () => set(createSourceFormInitialState),
    setFormIsDirty: (isDirty: boolean) =>
      set({
        formIsDirty: isDirty,
      }),
    setFieldValue: (fieldName, value) =>
      set(
        produce((state) => {
          state.fields[fieldName] = value;
        })
      ),
    setFieldError: (fieldName, value) =>
      set(
        produce((state) => {
          state.errors[fieldName] = value;
        })
      ),
    setFieldsValue: (fields) =>
      set(
        produce((state) => {
          state.fields = fields;
        })
      ),
    setErrorsValue: (errors) =>
      set(
        produce((state) => {
          state.errors = errors;
        })
      ),
  }))
);
