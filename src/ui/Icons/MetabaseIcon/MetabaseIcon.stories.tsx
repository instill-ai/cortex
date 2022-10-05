import { ComponentStory, ComponentMeta } from "@storybook/react";
import MetabaseIcon from "./MetabaseIcon";

export default {
  title: "Components/Ui/Icon/MetabaseIcon",
  component: MetabaseIcon,
} as ComponentMeta<typeof MetabaseIcon>;

const Template: ComponentStory<typeof MetabaseIcon> = (args) => (
  <MetabaseIcon {...args} />
);

export const Playground: ComponentStory<typeof MetabaseIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
