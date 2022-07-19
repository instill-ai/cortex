import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { ProgressMessageBoxState } from "../ProgressMessageBoxBase";
import BasicProgressMessageBox from "./BasicProgressMessageBox";

export default {
  title: "Components/Ui/Common/BasicProgressMessageBox",
  component: BasicProgressMessageBox,
} as ComponentMeta<typeof BasicProgressMessageBox>;

const Template: ComponentStory<typeof BasicProgressMessageBox> = (args) => {
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
      <BasicProgressMessageBox
        {...args}
        state={messageBoxState}
        setState={setMessageBoxState}
      />
    </>
  );
};
export const Playground: ComponentStory<typeof BasicProgressMessageBox> =
  Template.bind({});

Playground.args = {
  width: "w-[300px]",
  closable: true,
};
