import { Nullable } from "../../../lib";
import { CopyToClipboardButton } from "../../../components";
import { ConnectorNodeFieldRoot, EndNodeFieldRoot } from "./FieldRoot";

export type TextsFieldProps = {
  nodeType: "end" | "connector";
  title: Nullable<string>;
  texts: Nullable<string>[];
};

export const TextsField = (props: TextsFieldProps) => {
  const { nodeType, title, texts } = props;

  if (nodeType === "connector") {
    <ConnectorNodeFieldRoot title={title} key={`${title}-field`}>
      <div className="flex w-full flex-col flex-wrap gap-2">
        {texts?.map((text) => (
          <div
            key={`${title}-${text}-field`}
            className="flex max-w-[246px] flex-row justify-between gap-x-2"
          >
            <div className="break-all flex flex-1 text-semantic-fg-primary product-body-text-4-regular">
              {text}
            </div>
            {text ? (
              <CopyToClipboardButton className="!px-1 !py-1" text={text} />
            ) : null}
          </div>
        ))}
      </div>
    </ConnectorNodeFieldRoot>;
  }

  return (
    <EndNodeFieldRoot title={title} key={`${title}-field`}>
      <div className="flex-row flex-wrap gap-2">
        {texts?.map((text) => (
          <div
            key={`${title}-${text}-field`}
            className="flex max-w-[246px] flex-row justify-between gap-x-2"
          >
            <div className="flex flex-1 break-all border border-semantic-bg-line bg-semantic-bg-primary px-[9px] py-1.5 text-semantic-fg-primary product-body-text-4-regular">
              {text}
            </div>
            {text ? (
              <CopyToClipboardButton className="!px-1 !py-1" text={text} />
            ) : null}
          </div>
        ))}
      </div>
    </EndNodeFieldRoot>
  );
};
