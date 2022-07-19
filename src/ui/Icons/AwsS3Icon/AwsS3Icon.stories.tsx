import { ComponentStory, ComponentMeta } from "@storybook/react";
import AwsS3Icon from "./AwsS3Icon";

export default {
  title: "Components/Ui/Icon/AwsS3Icon",
  component: AwsS3Icon,
} as ComponentMeta<typeof AwsS3Icon>;

const Template: ComponentStory<typeof AwsS3Icon> = (args) => (
  <AwsS3Icon {...args} />
);

export const Playground: ComponentStory<typeof AwsS3Icon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
