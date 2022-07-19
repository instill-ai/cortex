import { ComponentStory, ComponentMeta } from "@storybook/react";
import PixelBaseBlock from "./PixelBaseBlock";

export default {
  title: "Components/Generators/Pixel/PixelBaseBlock",
  component: PixelBaseBlock,
} as ComponentMeta<typeof PixelBaseBlock>;

const Template: ComponentStory<typeof PixelBaseBlock> = (args) => (
  <PixelBaseBlock {...args} />
);

export const Default = Template.bind({});
