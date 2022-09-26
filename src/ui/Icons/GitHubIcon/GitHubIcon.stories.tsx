import { ComponentStory, ComponentMeta } from "@storybook/react";
import GitHubIcon from "./GitHubIcon";

export default {
  title: "Components/Ui/Icon/GitHubIcon",
  component: GitHubIcon,
} as ComponentMeta<typeof GitHubIcon>;

const Template: ComponentStory<typeof GitHubIcon> = (args) => (
  <GitHubIcon
    {...args}
    style={{
      width: "30px",
      height: "30px",
    }}
  />
);

export const Playground: ComponentStory<typeof GitHubIcon> = Template.bind({});

Playground.args = {
  color: "fill-instillGrey50",
  position: "my-auto",
};
