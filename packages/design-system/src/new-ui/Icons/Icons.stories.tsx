import { Meta, StoryFn } from "@storybook/react";
import { Icons } from ".";

const meta: Meta = {
  title: "Components/Ui/Icons",
};

export default meta;

const Template: StoryFn = (args) => {
  return (
    <div className="grid grid-flow-row grid-cols-8">
      {Object.entries(Icons).map(([, Icon]) => {
        return <Icon className="w-6 h-6 stroke-slate-500" />;
      })}
    </div>
  );
};

export const Default: StoryFn = Template.bind({});
