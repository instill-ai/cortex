import { ComponentStory, ComponentMeta } from "@storybook/react";
import PostgreSqlIcon from "./PostgreSqlIcon";

export default {
  title: "Components/Ui/Icon/PostgreSqlIcon",
  component: PostgreSqlIcon,
} as ComponentMeta<typeof PostgreSqlIcon>;

const Template: ComponentStory<typeof PostgreSqlIcon> = (args) => (
  <PostgreSqlIcon {...args} />
);

export const Playground: ComponentStory<typeof PostgreSqlIcon> = Template.bind(
  {}
);

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
