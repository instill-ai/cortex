import { ComponentStory, ComponentMeta } from "@storybook/react";
import BarChartIcon from "./BarChartIcon";

export default {
  title: "Components/Ui/Icon/BarChartIcon",
  component: BarChartIcon,
} as ComponentMeta<typeof BarChartIcon>;

const Template: ComponentStory<typeof BarChartIcon> = (args) => (
  <BarChartIcon {...args} />
);

export const Playground: ComponentStory<typeof BarChartIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
