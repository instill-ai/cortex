import * as React from "react";
import { Button, CopyIcon, Icons } from "@instill-ai/design-system";

export type CopyToClipboardButtonProps = {
  text: string;
};

export const CopyToClipboardButton = (props: CopyToClipboardButtonProps) => {
  const [copied, setCopied] = React.useState(false);

  return (
    <Button
      className="!px-2 !py-2 flex justify-center items-center"
      variant="secondaryGrey"
      size="sm"
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(props.text);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }}
    >
      {copied ? (
        <Icons.Check className="w-4 h-4 stroke-semantic-fg-primary" />
      ) : (
        <CopyIcon width="w-4" height="h-4" color="fill-semantic-fg-primary" />
      )}
    </Button>
  );
};
