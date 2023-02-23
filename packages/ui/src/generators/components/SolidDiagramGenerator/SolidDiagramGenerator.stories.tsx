import { Meta, StoryFn } from "@storybook/react";
import SolidDiagramGenerator from "./SolidDiagramGenerator";

const meta: Meta<typeof SolidDiagramGenerator> = {
  title: "Components/Generators/Solid/SolidDiagramGenerator",
  component: SolidDiagramGenerator,
};

export default meta;

const Template: StoryFn<typeof SolidDiagramGenerator> = (args) => (
  <SolidDiagramGenerator {...args} />
);

export const Default: StoryFn<typeof SolidDiagramGenerator> = Template.bind({});
