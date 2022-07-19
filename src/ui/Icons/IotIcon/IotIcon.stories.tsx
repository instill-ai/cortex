import { ComponentStory, ComponentMeta } from "@storybook/react";
import IotIcon from "./IotIcon";

export default {
  title: "Components/Ui/Icon/IotIcon",
  component: IotIcon,
} as ComponentMeta<typeof IotIcon>;

const Template: ComponentStory<typeof IotIcon> = (args) => (
  <IotIcon {...args} />
);

export const Playground: ComponentStory<typeof IotIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
