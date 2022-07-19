import { ComponentStory, ComponentMeta } from "@storybook/react";
import SolidDiagramGenerator from "./SolidDiagramGenerator";

export default {
  title: "Components/Generators/Solid/SolidDiagramGenerator",
  component: SolidDiagramGenerator,
} as ComponentMeta<typeof SolidDiagramGenerator>;

const Template: ComponentStory<typeof SolidDiagramGenerator> = (args) => (
  <SolidDiagramGenerator {...args} />
);

export const Default = Template.bind({});
