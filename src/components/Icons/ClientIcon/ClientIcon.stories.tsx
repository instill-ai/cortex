import { ComponentStory, ComponentMeta } from "@storybook/react";
import ClientIcon from "./ClientIcon";

export default {
  title: "Components/Ui/Icon/ClientIcon",
  component: ClientIcon,
} as ComponentMeta<typeof ClientIcon>;

const Template: ComponentStory<typeof ClientIcon> = (args) => (
  <ClientIcon {...args} />
);

export const Playground: ComponentStory<typeof ClientIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGray50",
  position: "my-auto",
};
