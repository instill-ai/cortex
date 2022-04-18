import { ComponentStory, ComponentMeta } from "@storybook/react";
import DataDestinationIcon from "./DataDestinationIcon";

export default {
  title: "Components/Ui/Icon/DataDestinationIcon",
  component: DataDestinationIcon,
} as ComponentMeta<typeof DataDestinationIcon>;

const Template: ComponentStory<typeof DataDestinationIcon> = (args) => (
  <DataDestinationIcon {...args} />
);

export const Playground: ComponentStory<typeof DataDestinationIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
