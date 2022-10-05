import { ComponentStory, ComponentMeta } from "@storybook/react";
import PythonIcon from "./PythonIcon";

export default {
  title: "Components/Ui/Icon/PythonIcon",
  component: PythonIcon,
} as ComponentMeta<typeof PythonIcon>;

const Template: ComponentStory<typeof PythonIcon> = (args) => (
  <PythonIcon {...args} />
);

export const Playground: ComponentStory<typeof PythonIcon> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  position: "my-auto",
};
