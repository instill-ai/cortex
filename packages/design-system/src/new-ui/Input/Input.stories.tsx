import { Meta, StoryFn } from "@storybook/react";
import { Input } from "./Input";
import { Icons } from "../Icons";

const meta: Meta = {
  title: "Components/NewUi/Input",
};

export default meta;

const Template: StoryFn = () => {
  return (
    <Input.Root>
      <Input.Label>Label</Input.Label>
      <Input.FieldContainer>
        {/* <Input.LeftIcon>
          <Icons.Box className="w-5 h-5 my-auto stroke-slate-800" />
        </Input.LeftIcon> */}
        <Input.Field disabled={false} type="text" placeholder="Hello world" />
        <Input.LeftIcon
          onClick={() => {
            alert("hi");
          }}
        >
          <Icons.Box className="w-5 h-5 my-auto stroke-slate-800 cursor-pointer" />
        </Input.LeftIcon>
      </Input.FieldContainer>
      <Input.Description>This is description</Input.Description>
    </Input.Root>
  );
};

export const Playground: StoryFn<typeof Input> = Template.bind({});

Playground.args = {};
