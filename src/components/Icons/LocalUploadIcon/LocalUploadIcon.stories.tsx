import { ComponentStory, ComponentMeta } from "@storybook/react";
import LocalUploadIcon from "./LocalUploadIcon";

export default {
  title: "Components/Ui/Icon/LocalUploadIcon",
  component: LocalUploadIcon,
} as ComponentMeta<typeof LocalUploadIcon>;

const Template: ComponentStory<typeof LocalUploadIcon> = (args) => (
  <LocalUploadIcon {...args} />
);

export const Playground: ComponentStory<typeof LocalUploadIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "fill-instillGrey50",
  position: "my-auto",
};
