import { Nullable } from "../../../lib";
import { ConnectorNodeFieldRoot, EndNodeFieldRoot } from "./FieldRoot";

export type ObjectFieldProps = {
  nodeType: "end" | "connector";
  title: Nullable<string>;
  object: Nullable<Record<string, any>>;
};

export const ObjectField = (props: ObjectFieldProps) => {
  const { nodeType, title, object } = props;

  if (nodeType === "connector") {
    return (
      <ConnectorNodeFieldRoot title={title} key={`${title}-field`}>
        <div className="flex max-w-[246px]">
          <div className="break-all flex flex-1 text-semantic-fg-primary product-body-text-4-regular">
            {JSON.stringify(object, null, 2)}
          </div>
        </div>
      </ConnectorNodeFieldRoot>
    );
  }

  return (
    <EndNodeFieldRoot title={title} key={`${title}-field`}>
      <div className="flex max-w-[246px]">
        <div className="break-all flex flex-1 text-semantic-fg-primary product-body-text-4-regular">
          {JSON.stringify(object, null, 2)}
        </div>
      </div>
    </EndNodeFieldRoot>
  );
};
