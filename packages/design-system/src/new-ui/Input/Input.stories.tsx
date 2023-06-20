import { Meta, StoryFn } from "@storybook/react";
import { Input } from "./Input";
import { Icons } from "../Icons";
import { Field } from "../Field";

const meta: Meta = {
  title: "Components/NewUi/Input",
};

export default meta;

const Template: StoryFn = () => {
  return (
    <Field.Root>
      <Field.Label>Label</Field.Label>
      <Input.Root>
        {/* <Input.LeftIcon>
          <Icons.Box className="w-5 h-5 my-auto stroke-slate-800" />
        </Input.LeftIcon> */}
        <Input.Core disabled={false} type="text" placeholder="Hello world" />
        <Input.LeftIcon
          onClick={() => {
            alert("hi");
          }}
        >
          <Icons.Box className="w-5 h-5 my-auto stroke-slate-800 cursor-pointer" />
        </Input.LeftIcon>
      </Input.Root>
      <Field.Description>This is description</Field.Description>
    </Field.Root>
  );
};

export const Playground: StoryFn<typeof Input> = Template.bind({});

Playground.args = {};
