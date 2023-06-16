import * as React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Dialog } from "./Dialog";

const meta: Meta = {
  title: "Components/NewUi/Dialog",
};

export default meta;

const Template: StoryFn = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>Open Dialog</button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you&apos;re done.
          </Dialog.Description>
        </Dialog.Header>
        <div className="flex flex-col space-y-2">
          This is the content of the dialog
        </div>
        <Dialog.Footer>
          <button className="px-2 flex mr-auto py-1 border" type="submit">
            Save changes
          </button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export const Playground: StoryFn<typeof Dialog> = Template.bind({});

Playground.args = {};
