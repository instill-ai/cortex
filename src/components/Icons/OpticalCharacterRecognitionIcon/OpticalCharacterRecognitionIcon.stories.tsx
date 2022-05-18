import { ComponentStory, ComponentMeta } from "@storybook/react";
import OpticalCharacterRecognitionIcon from "./OpticalCharacterRecognitionIcon";

export default {
  title: "Components/Ui/Icon/OpticalCharacterRecognitionIcon",
  component: OpticalCharacterRecognitionIcon,
} as ComponentMeta<typeof OpticalCharacterRecognitionIcon>;

const Template: ComponentStory<typeof OpticalCharacterRecognitionIcon> = (
  args
) => <OpticalCharacterRecognitionIcon {...args} />;

export const Playground: ComponentStory<
  typeof OpticalCharacterRecognitionIcon
> = Template.bind({});

Playground.args = {
  width: "w-[30px]",
  height: "h-[30px]",
  color: "text-instillGrey50",
  position: "my-auto",
};
