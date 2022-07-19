import { ComponentStory, ComponentMeta } from "@storybook/react";
import GoogleSheetIcon from "./GoogleSheetIcon";

export default {
  title: "Components/Ui/Icon/GoogleSheetIcon",
  component: GoogleSheetIcon,
} as ComponentMeta<typeof GoogleSheetIcon>;

const Template: ComponentStory<typeof GoogleSheetIcon> = (args) => (
  <GoogleSheetIcon {...args} />
);

export const Playground: ComponentStory<typeof GoogleSheetIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
