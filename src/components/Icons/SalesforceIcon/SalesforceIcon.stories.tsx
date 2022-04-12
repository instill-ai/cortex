import { ComponentStory, ComponentMeta } from "@storybook/react";
import SalesforceIcon from "./SalesforceIcon";

export default {
  title: "Components/Ui/Icon/SalesforceIcon",
  component: SalesforceIcon,
} as ComponentMeta<typeof SalesforceIcon>;

const Template: ComponentStory<typeof SalesforceIcon> = (args) => (
  <SalesforceIcon {...args} />
);

export const Playground: ComponentStory<typeof SalesforceIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
