import { ComponentStory, ComponentMeta } from "@storybook/react";
import VersionIcon from "./VersionIcon";

export default {
  title: "Components/Ui/Icon/VersionIcon",
  component: VersionIcon,
} as ComponentMeta<typeof VersionIcon>;

const Template: ComponentStory<typeof VersionIcon> = (args) => (
  <VersionIcon {...args} />
);

export const Playground: ComponentStory<typeof VersionIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
