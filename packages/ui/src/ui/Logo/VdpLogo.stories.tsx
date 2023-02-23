import { Meta, StoryFn } from "@storybook/react";
import VdpLogo from "./VdpLogo";

const meta: Meta<typeof VdpLogo> = {
  title: "Components/Ui/VdpLogo",
  component: VdpLogo,
};

export default meta;

const Template: StoryFn<typeof VdpLogo> = (args) => <VdpLogo {...args} />;

export const Default: StoryFn<typeof VdpLogo> = Template.bind({});

Default.args = {
  type: "square",
  width: 120,
};
