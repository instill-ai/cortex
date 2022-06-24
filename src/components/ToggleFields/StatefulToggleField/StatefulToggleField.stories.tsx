import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useEffect, useState } from "react";
import { State } from "../../../types/general";
import StatefulToggleField from "./StatefulToggleField";

export default {
  title: "Components/Ui/Input/StatefulToggleField",
  component: StatefulToggleField,
} as ComponentMeta<typeof StatefulToggleField>;

const Template: ComponentStory<typeof StatefulToggleField> = (args) => {
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState<State>("STATE_UNSPECIFIED");

  return (
    <StatefulToggleField
      {...args}
      id="basic-toggle-field"
      onChangeInput={(_, value) => {
        setState("STATE_LOADING");
        setTimeout(() => {
          setState("STATE_ACTIVE");
          setChecked(value);
        }, 3000);
      }}
      value={checked}
      description="this is a description for basic toggle field"
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
  defaultChecked: false,
  disabled: false,
  readOnly: false,
  required: true,
};
