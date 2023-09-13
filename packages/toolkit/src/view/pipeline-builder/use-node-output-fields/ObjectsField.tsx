import { Nullable } from "../../../lib";
import { ConnectorNodeFieldRoot, EndNodeFieldRoot } from "./FieldRoot";

export type ObjectsFieldProps = {
  nodeType: "end" | "connector";
  title: Nullable<string>;
  objects: Nullable<Record<string, any>[]>;
};

export const ObjectsField = (props: ObjectsFieldProps) => {
  const { nodeType, title, objects } = props;

  if (nodeType === "connector") {
    return (
      <ConnectorNodeFieldRoot title={title} key={`${title}-field`}>
        <div className="flex w-full flex-col flex-wrap gap-2 max-w-[246px]">
          {objects?.map((object) => (
            <div
              key={`${title}-${JSON.stringify(object)}-field`}
              className="break-all flex flex-1 text-semantic-fg-primary product-body-text-4-regular"
            >
              {JSON.stringify(object, null, 2)}
            </div>
          ))}
        </div>
      </ConnectorNodeFieldRoot>
    );
  }

  return (
    <EndNodeFieldRoot title={title} key={`${title}-field`}>
      <div className="flex w-full flex-col flex-wrap gap-2 max-w-[246px]">
        {objects?.map((object) => (
          <div
            key={`${title}-${JSON.stringify(object)}-field`}
            className="break-all flex flex-1 text-semantic-fg-primary product-body-text-4-regular"
          >
            {JSON.stringify(object, null, 2)}
          </div>
        ))}
      </div>
    </EndNodeFieldRoot>
  );
};
