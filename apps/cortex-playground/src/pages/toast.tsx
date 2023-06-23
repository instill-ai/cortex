import { Button, useToast } from "@instill-ai/design-system";

const ToastPage = () => {
  const { toast } = useToast();
  return (
    <Button
      variant="primary"
      size="lg"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
          variant: "notification-icon",
          size: "small",
        });
      }}
    >
      Toast
    </Button>
  );
};

export default ToastPage;
