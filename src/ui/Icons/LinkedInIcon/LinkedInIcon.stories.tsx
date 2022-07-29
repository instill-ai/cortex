import { ComponentStory, ComponentMeta } from "@storybook/react";
import LinkedInIcon from "./LinkedInIcon";

export default {
  title: "Components/Ui/Icon/LinkedInIcon",
  component: LinkedInIcon,
} as ComponentMeta<typeof LinkedInIcon>;

const Template: ComponentStory<typeof LinkedInIcon> = (args) => (
  <LinkedInIcon {...args} />
);

export const Playground: ComponentStory<typeof LinkedInIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
