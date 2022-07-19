import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicInputDescription from "./BasicInputDescription";

export default {
  title: "Components/Ui/Input/BasicInputDescription",
  component: BasicInputDescription,
} as ComponentMeta<typeof BasicInputDescription>;

const Template: ComponentStory<typeof BasicInputDescription> = (args) => (
  <BasicInputDescription description="this is description <a href='#'>setup guide</a>" />
);

export const Playground: ComponentStory<typeof BasicInputDescription> =
  Template.bind({});
