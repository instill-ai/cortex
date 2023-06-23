import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";
import { Toaster } from "./Toaster";
import { Button } from "../Button";
import { useToast } from "./use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const meta: Meta<typeof Toast> = {
  title: "Components/NewUi/Toast",
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const AlertInfo: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Toaster />
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
              variant: "alert-info",
              size: "small",
            });
          }}
        >
          Toast
        </Button>
      </>
    );
  },
};

export const AlertSuccess: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Toaster />
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
              variant: "alert-success",
              size: "small",
            });
          }}
        >
          Toast
        </Button>
      </>
    );
  },
};

export const AlertWarning: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Toaster />
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
              variant: "alert-warning",
              size: "small",
            });
          }}
        >
          Toast
        </Button>
      </>
    );
  },
};

export const AlertError: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Toaster />
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
              variant: "alert-error",
              size: "small",
            });
          }}
        >
          Toast
        </Button>
      </>
    );
  },
};

export const AlertWithAction: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <>
        <Toaster />
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
              variant: "alert-error",
              size: "large",
              action: <Toast.Action altText="UndoAction">Undo</Toast.Action>,
            });
          }}
        >
          Toast
        </Button>
      </>
    );
  },
};
