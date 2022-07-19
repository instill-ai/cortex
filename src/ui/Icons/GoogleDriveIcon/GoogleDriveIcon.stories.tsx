import { ComponentStory, ComponentMeta } from "@storybook/react";
import GoogleDriveIcon from "./GoogleDriveIcon";

export default {
  title: "Components/Ui/Icon/GoogleDriveIcon",
  component: GoogleDriveIcon,
} as ComponentMeta<typeof GoogleDriveIcon>;

const Template: ComponentStory<typeof GoogleDriveIcon> = (args) => (
  <GoogleDriveIcon {...args} />
);

export const Playground: ComponentStory<typeof GoogleDriveIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
