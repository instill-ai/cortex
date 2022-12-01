import { ComponentStory, ComponentMeta } from "@storybook/react";
import FilterIcon from "./FilterIcon";

export default {
  title: "Components/Ui/Icon/FilterIcon",
  component: FilterIcon,
} as ComponentMeta<typeof FilterIcon>;

const Template: ComponentStory<typeof FilterIcon> = (args) => (
  <FilterIcon {...args} />
);

export const Playground: ComponentStory<typeof FilterIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
