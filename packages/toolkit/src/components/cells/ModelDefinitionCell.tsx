import cn from "clsx";
import { getModelDefinitionToolkit } from "@instill-ai/design-system";

export type ModelDefinitionCellProps = {
  width: string;
  modelDefinition: string;
  padding: string;
};

export const ModelDefinitionCell = ({
  modelDefinition,
  width,
  padding,
}: ModelDefinitionCellProps) => {
  const iconStyle = {
    width: "w-5",
    height: "h-5",
    position: "my-auto",
    color: "fill-instillGrey90",
  };

  const { title, getIcon } = getModelDefinitionToolkit(modelDefinition);

  return (
    <td>
      <div className={cn("flex flex-row gap-x-2", width, padding)}>
        {getIcon(iconStyle)}
        <p className="my-auto flex text-instillGrey90 text-instill-body">
          {title}
        </p>
      </div>
    </td>
  );
};
