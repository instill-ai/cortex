import { Nullable } from "../../../lib";
import { CopyToClipboardButton } from "../../../components";
import { ConnectorNodeFieldRoot, EndNodeFieldRoot } from "./FieldRoot";

export type TextFieldProps = {
  nodeType: "end" | "connector";
  title: Nullable<string>;
  text: Nullable<string>;
};

export const TextField = (props: TextFieldProps) => {
  const { nodeType, title, text } = props;

  if (nodeType === "connector") {
    return (
      <ConnectorNodeFieldRoot title={title} key={`${title}-field`}>
        <div className="flex max-w-[246px] flex-row justify-between gap-x-2">
          <div className="break-all flex flex-1 text-semantic-fg-primary product-body-text-4-regular">
            {text}
          </div>
          {text ? (
            <CopyToClipboardButton className="!px-1 !py-1" text={text} />
          ) : null}
        </div>
      </ConnectorNodeFieldRoot>
    );
  }

  return (
    <EndNodeFieldRoot title={title} key={`${title}-field`}>
      <div className="flex max-w-[246px] flex-row justify-between gap-x-2">
        <div className="flex flex-1 break-all border border-semantic-bg-line bg-semantic-bg-primary px-[9px] py-1.5 text-semantic-fg-primary product-body-text-4-regular">
          {text}
        </div>
        {text ? (
          <CopyToClipboardButton className="!px-1 !py-1" text={text} />
        ) : null}
      </div>
    </EndNodeFieldRoot>
  );
};
