import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { State } from "../../../types/general";
import StatefulToggleField from "./StatefulToggleField";

export default {
  title: "Components/Ui/Input/StatefulToggleField",
  component: StatefulToggleField,
} as ComponentMeta<typeof StatefulToggleField>;

const Template: ComponentStory<typeof StatefulToggleField> = (args) => {
  const [state, setState] = useState<State>("STATE_UNSPECIFIED");

  return (
    <StatefulToggleField
      {...args}
      id="basic-toggle-field"
      onChange={() => {
        setState("STATE_LOADING");
        setTimeout(() => {
          setState("STATE_ACTIVE");
        }, 1000);
      }}
      value={state === "STATE_ACTIVE" ? true : false}
      description="this is a description for basic toggle field <a href='#'>setup guide</a>"
      label="basic-toggle-field"
      error={
        state === "STATE_ERROR" ? "There is an error. Please try again." : null
      }
      state={state}
    />
  );
};

export const Playground: ComponentStory<typeof StatefulToggleField> =
  Template.bind({});

Playground.args = {
  disabled: false,
  readOnly: false,
  required: true,
};
