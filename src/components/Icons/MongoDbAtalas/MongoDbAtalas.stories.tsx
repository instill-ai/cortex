import { ComponentStory, ComponentMeta } from "@storybook/react";
import MongoDbAtalas from "./MongoDbAtalas";

export default {
  title: "Components/Ui/Icon/MongoDbAtalas",
  component: MongoDbAtalas,
} as ComponentMeta<typeof MongoDbAtalas>;

const Template: ComponentStory<typeof MongoDbAtalas> = (args) => (
  <MongoDbAtalas {...args} />
);

export const Playground: ComponentStory<typeof MongoDbAtalas> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
