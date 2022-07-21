import { ComponentStory, ComponentMeta } from "@storybook/react";
import CollapseSidebarButton from "./CollapseSidebarButton";

export default {
  title: "Components/Ui/Button/CollapseSidebarButton",
  component: CollapseSidebarButton,
} as ComponentMeta<typeof CollapseSidebarButton>;

const Template: ComponentStory<typeof CollapseSidebarButton> = (args) => (
  <CollapseSidebarButton {...args} />
);
export const Playground: ComponentStory<typeof CollapseSidebarButton> =
  Template.bind({});

Playground.args = {
  isCollapse: false,
};
