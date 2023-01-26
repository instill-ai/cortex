import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { State } from "../../../types/general";
import StatefulToggleField from "./StatefulToggleField";

const meta: Meta<typeof StatefulToggleField> = {
  title: "Components/Ui/Input/StatefulToggleField",
  component: StatefulToggleField,
};

export default meta;

const Template: StoryFn<typeof StatefulToggleField> = (args) => {
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
      loadingLabelText="Loading..."
    />
  );
};

export const Playground: StoryFn<typeof StatefulToggleField> = Template.bind(
  {}
);

Playground.args = {
  disabled: false,
  readOnly: false,
  required: true,
};
