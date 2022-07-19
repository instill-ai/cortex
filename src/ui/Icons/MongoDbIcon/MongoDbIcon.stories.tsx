import { ComponentStory, ComponentMeta } from "@storybook/react";
import MongoDbIcon from "./MongoDbIcon";

export default {
  title: "Components/Ui/Icon/MongoDbIcon",
  component: MongoDbIcon,
} as ComponentMeta<typeof MongoDbIcon>;

const Template: ComponentStory<typeof MongoDbIcon> = (args) => (
  <MongoDbIcon {...args} />
);

export const Playground: ComponentStory<typeof MongoDbIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
