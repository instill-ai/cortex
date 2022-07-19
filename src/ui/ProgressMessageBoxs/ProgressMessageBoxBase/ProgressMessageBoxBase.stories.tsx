import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { basicProgressMessageBoxConfig } from "../BasicProgressMessageBox";
import ProgressMessageBoxBase, {
  ProgressMessageBoxState,
} from "./ProgressMessageBoxBase";

export default {
  title: "Components/Base/Common/ProgressMessageBoxBase",
  component: ProgressMessageBoxBase,
} as ComponentMeta<typeof ProgressMessageBoxBase>;

const Template: ComponentStory<typeof ProgressMessageBoxBase> = (args) => {
  const [messageBoxState, setMessageBoxState] =
    useState<ProgressMessageBoxState>({
      activate: true,
      message: "hi",
      description: "please wait",
      status: "progressing",
    });
  return (
    <>
      <button
        className="mb-10"
        onClick={() =>
          setMessageBoxState((prev) => ({
            ...prev,
            activate: true,
          }))
        }
      >
        Activate message box
      </button>
      <ProgressMessageBoxBase
        {...args}
        state={messageBoxState}
        setState={setMessageBoxState}
      />
    </>
  );
};
export const Playground: ComponentStory<typeof ProgressMessageBoxBase> =
  Template.bind({});

Playground.args = {
  width: "w-[300px]",
  ...basicProgressMessageBoxConfig,
  closable: true,
};
