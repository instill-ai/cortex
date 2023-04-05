import cn from "clsx";
import { getModelDefinitionToolkit } from "@instill-ai/design-system";
import { Nullable } from "../lib";

export type ModelDefinitionLabelProps = {
  modelDefinition: Nullable<string>;
  marginBottom: Nullable<string>;
  position: Nullable<string>;
};

export const ModelDefinitionLabel = ({
  modelDefinition,
  marginBottom,
  position,
}: ModelDefinitionLabelProps) => {
  const iconStyle = {
    width: "w-[18px]",
    height: "h-[18px]",
    position: "my-auto",
    color: "fill-instillGrey95",
  };

  if (!modelDefinition) {
    return (
      <div
        className={cn("flex gap-x-2 bg-white p-2", marginBottom, position)}
        data-testid="model-definition-label"
      >
        <div className={cn(iconStyle.width, iconStyle.height)} />
        <p className="my-auto flex text-instillGrey90 text-instill-small">
          Unspecified
        </p>
      </div>
    );
  }

  const toolkit = getModelDefinitionToolkit(modelDefinition);

  return (
    <div
      className={cn("flex gap-x-2 bg-white p-2", marginBottom, position)}
      data-testid="model-definition-label"
    >
      {toolkit.getIcon(iconStyle)}
      <p className="my-auto flex text-instillGrey90 text-instill-small">
        {toolkit.label}
      </p>
    </div>
  );
};
