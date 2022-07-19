import { ComponentStory, ComponentMeta } from "@storybook/react";
import AwsRdsIcon from "./AwsRdsIcon";

export default {
  title: "Components/Ui/Icon/AwsRdsIcon",
  component: AwsRdsIcon,
} as ComponentMeta<typeof AwsRdsIcon>;

const Template: ComponentStory<typeof AwsRdsIcon> = (args) => (
  <AwsRdsIcon {...args} />
);

export const Playground: ComponentStory<typeof AwsRdsIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
