import { ComponentStory, ComponentMeta } from "@storybook/react";
import Logo from "./Logo";

export default {
  title: "Components/Ui/Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Default = Template.bind({});
