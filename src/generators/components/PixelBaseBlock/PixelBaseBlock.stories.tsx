import { Meta, StoryFn } from "@storybook/react";
import PixelBaseBlock from "./PixelBaseBlock";

const meta: Meta<typeof PixelBaseBlock> = {
  title: "Components/Generators/Pixel/PixelBaseBlock",
  component: PixelBaseBlock,
};

export default meta;

const Template: StoryFn<typeof PixelBaseBlock> = (args) => (
  <PixelBaseBlock {...args} />
);

export const Default: StoryFn<typeof PixelBaseBlock> = Template.bind({});
