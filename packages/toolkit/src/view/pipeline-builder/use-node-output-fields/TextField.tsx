import { Nullable } from "../../../lib";
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
        <div className="flex break-words text-semantic-fg-primary product-body-text-4-regular">
          {text}
        </div>
      </ConnectorNodeFieldRoot>
    );
  }

  return (
    <EndNodeFieldRoot title={title} key={`${title}-field`}>
      <div className="flex max-w-[200px] break-words border border-semantic-bg-line bg-semantic-bg-primary px-[9px] py-1.5 text-semantic-fg-primary product-body-text-4-regular">
        {text}
      </div>
    </EndNodeFieldRoot>
  );
};
