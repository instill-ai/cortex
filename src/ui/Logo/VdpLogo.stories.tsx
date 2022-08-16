import { ComponentStory, ComponentMeta } from "@storybook/react";
import VdpLogo from "./VdpLogo";
export default {
  title: "Components/Ui/VdpLogo",
  component: VdpLogo,
} as ComponentMeta<typeof VdpLogo>;

const Template: ComponentStory<typeof VdpLogo> = (args) => (
  <VdpLogo {...args} />
);

export const Default = Template.bind({});

Default.args = {
  type: "square",
};
