import { Meta, StoryFn } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta = {
  title: "Components/NewUi/Select",
};

export default meta;

const Template: StoryFn = () => {
  return (
    <Select.Root>
      <Select.Trigger className="w-full">
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="blueberry">Blueberry</Select.Item>
          <Select.Item value="grapes">Grapes</Select.Item>
          <Select.Item value="pineapple">Pineapple</Select.Item>
          <Select.Item value="1">1</Select.Item>
          <Select.Item value="2">2</Select.Item>
          <Select.Item value="3">3</Select.Item>
          <Select.Item value="4">4</Select.Item>
          <Select.Item value="5">5</Select.Item>
          <Select.Item value="6">6</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export const Playground: StoryFn<typeof Select> = Template.bind({});

Playground.args = {};
