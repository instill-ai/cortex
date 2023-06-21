import { Meta, StoryFn } from "@storybook/react";
import { Input } from "./Input";
import { Icons } from "../Icons";
import { Field } from "../Field";
import { Form } from "../Form/Form";

const meta: Meta = {
  title: "Components/NewUi/Input",
};

export default meta;

const TextWithIconTemplate: StoryFn = () => {
  return (
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
  );
};

export const TextWithIcon: StoryFn<typeof Input> = TextWithIconTemplate.bind(
  {}
);

TextWithIcon.args = {};

const FileTemplate: StoryFn = () => {
  return (
    <Input.Root>
      <Input.LeftIcon>
        <Icons.Chip01 className="w-5 h-5 my-auto stroke-slate-800" />
      </Input.LeftIcon>
      <Input.Core disabled={false} type="file" placeholder="Upload your chip" />
    </Input.Root>
  );
};

export const File: StoryFn<typeof Input> = FileTemplate.bind({});

File.args = {};
