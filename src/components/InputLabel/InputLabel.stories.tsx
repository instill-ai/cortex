import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputLabel from "./InputLabel";
import { StoryGroup } from "../../utils/StoryGroup";

export default {
  title: "Components/Ui/Input/InputLabel",
  component: InputLabel,
} as ComponentMeta<typeof InputLabel>;

const Template: ComponentStory<typeof InputLabel> = (args) => (
  <InputLabel {...args}>Playground label</InputLabel>
);

export const Playground = Template.bind({});

export const Default: ComponentStory<typeof InputLabel> = () => (
  <InputLabel
    fontStyle="font-normal text-base leading-[28px]"
    focus={false}
    htmlFor="default"
    answered={false}
    required={false}
    type="inset"
  >
    Default label
  </InputLabel>
);

export const Required: ComponentStory<typeof InputLabel> = () => (
  <InputLabel
    fontStyle="font-normal text-base leading-[28px]"
    focus={false}
    htmlFor="default"
    answered={false}
    required={true}
    type="inset"
  >
    Required label
  </InputLabel>
);

export const Answered: ComponentStory<typeof InputLabel> = () => (
  <InputLabel
    fontStyle="font-normal text-base leading-[28px]"
    focus={false}
    htmlFor="default"
    answered={true}
    required={false}
    type="inset"
  >
    Answered label
  </InputLabel>
);

export const Focused: ComponentStory<typeof InputLabel> = () => (
  <InputLabel
    fontStyle="font-normal text-base leading-[28px]"
    focus={true}
    htmlFor="default"
    answered={false}
    required={false}
    type="inset"
  >
    Focused label
  </InputLabel>
);

export const All: ComponentStory<typeof InputLabel> = () => (
  <StoryGroup>
    <div className="relative h-10 border mb-2">
      <InputLabel
        fontStyle="font-normal text-base leading-[28px]"
        focus={false}
        htmlFor="default"
        answered={false}
        required={false}
        type="inset"
      >
        Default label
      </InputLabel>
    </div>

    <div className="relative h-10 border mb-2">
      <InputLabel
        fontStyle="font-normal text-base leading-[28px]"
        focus={false}
        htmlFor="default"
        answered={false}
        required={true}
        type="inset"
      >
        Required label
      </InputLabel>
    </div>
    <div className="relative h-10 border mb-2">
      <InputLabel
        fontStyle="font-normal text-base leading-[28px]"
        focus={false}
        htmlFor="default"
        answered={true}
        required={false}
        type="inset"
      >
        Answered label
      </InputLabel>
    </div>
    <div className="relative h-10 border mb-2">
      <InputLabel
        fontStyle="font-normal text-base leading-[28px]"
        focus={true}
        htmlFor="default"
        answered={false}
        required={false}
        type="inset"
      >
        Focused label
      </InputLabel>
    </div>
  </StoryGroup>
);
