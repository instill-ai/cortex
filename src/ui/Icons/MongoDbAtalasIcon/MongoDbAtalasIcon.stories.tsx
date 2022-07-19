import { ComponentStory, ComponentMeta } from "@storybook/react";
import MongoDbAtalasIcon from "./MongoDbAtalasIcon";

export default {
  title: "Components/Ui/Icon/MongoDbAtalasIcon",
  component: MongoDbAtalasIcon,
} as ComponentMeta<typeof MongoDbAtalasIcon>;

const Template: ComponentStory<typeof MongoDbAtalasIcon> = (args) => (
  <MongoDbAtalasIcon {...args} />
);

export const Playground: ComponentStory<typeof MongoDbAtalasIcon> =
  Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
