import { ComponentStory, ComponentMeta } from "@storybook/react";
import GitHubIcon from "./GitHubIcon";

export default {
  title: "Components/Ui/Icon/GitHubIcon",
  component: GitHubIcon,
} as ComponentMeta<typeof GitHubIcon>;

const Template: ComponentStory<typeof GitHubIcon> = (args) => (
  <GitHubIcon {...args} />
);

export const Playground: ComponentStory<typeof GitHubIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};

export const WithStyle: ComponentStory<typeof GitHubIcon> = Template.bind({});

WithStyle.args = {
  color: "fill-instillGrey50",
  position: "my-auto",
  style: {
    width: "30px",
    height: "30px",
  },
};
