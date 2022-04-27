import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicInputDescription from "./BasicInputDescription";

export default {
  title: "Components/Ui/Input/BasicInputDescription",
  component: BasicInputDescription,
} as ComponentMeta<typeof BasicInputDescription>;

const Template: ComponentStory<typeof BasicInputDescription> = (args) => (
  <BasicInputDescription {...args} />
);

export const Playground: ComponentStory<typeof BasicInputDescription> =
  Template.bind({});

Playground.args = {
  description: "this is description",
};
