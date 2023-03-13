import { z } from "zod";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const messageBoxSchema = z.object({
  status: z.nullable(z.enum(["success", "error", "processing"])),
  message: z.nullable(z.string()),
  description: z.nullable(z.string()),
  activate: z.boolean(),
});

export type MessageBoxState = z.infer<typeof messageBoxSchema>;

export type MessageBoxAction = {
  setStateValue: <T extends keyof MessageBoxState>(
    stateName: T,
    value: MessageBoxState[T]
  ) => void;
  init: () => void;
};

export type MessageBoxStore = MessageBoxState & MessageBoxAction;

export const messageBoxInitialState: MessageBoxState = {
  status: null,
  message: null,
  description: null,
  activate: false,
};

export const useConfigureModelFormStore = create<MessageBoxStore>()(
  devtools((set) => ({
    ...messageBoxInitialState,
    init: () => set(messageBoxInitialState),
    setStateValue: (stateName, value) =>
      set((state) => ({
        ...state,
        [stateName]: value,
      })),
  }))
);
