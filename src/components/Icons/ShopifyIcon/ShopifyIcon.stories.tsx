import { ComponentStory, ComponentMeta } from "@storybook/react";
import ShopifyIcon from "./ShopifyIcon";

export default {
  title: "Components/Ui/Icon/ShopifyIcon",
  component: ShopifyIcon,
} as ComponentMeta<typeof ShopifyIcon>;

const Template: ComponentStory<typeof ShopifyIcon> = (args) => (
  <ShopifyIcon {...args} />
);

export const Playground: ComponentStory<typeof ShopifyIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
