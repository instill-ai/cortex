import { ComponentStory, ComponentMeta } from "@storybook/react";
import ResourceIcon from "./ResourceIcon";

export default {
  title: "Components/Ui/Icon/ResourceIcon",
  component: ResourceIcon,
} as ComponentMeta<typeof ResourceIcon>;

const Template: ComponentStory<typeof ResourceIcon> = (args) => (
  <ResourceIcon {...args} />
);

export const Playground: ComponentStory<typeof ResourceIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
