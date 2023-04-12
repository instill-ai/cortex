import cn from "clsx";
import { useMemo } from "react";
import {
  ConnectionTypeCell,
  TableLoadingProgress,
  TableHead,
  ModelsCell,
  type TableHeadItem,
  TableError,
} from "../../components";
import type { Nullable, Pipeline } from "../../lib";

export type PipelineTableProps = {
  pipeline: Nullable<Pipeline>;
  marginBottom: Nullable<string>;
  isError: boolean;
};

export const PipelineTable = ({
  pipeline,
  marginBottom,
  isError,
}: PipelineTableProps) => {
  const tableHeadItems = useMemo<TableHeadItem[]>(() => {
    const getHeadItem = (name: string) => {
      return (
        <div className="flex flex-row gap-x-[15px]">
          <div className="my-auto text-instillGrey90 text-instill-body">
            {name}
          </div>
        </div>
      );
    };

    return [
      {
        key: "pipeline-source",
        item: getHeadItem("Source"),
        width: "w-auto",
      },
      {
        key: "pipeline-models",
        item: getHeadItem("Models"),
        width: "w-auto",
      },
      {
        key: "pipeline-destination",
        item: getHeadItem("Destination"),
        width: "w-auto",
      },
    ];
  }, []);

  if (!pipeline) {
    return <TableLoadingProgress marginBottom={null} />;
  }

  if (isError) {
    return <TableError marginBottom={null} />;
  }

  return (
    <table className={cn("w-full table-auto border-collapse", marginBottom)}>
      <TableHead
        bgColor="bg-instillGrey05"
        borderColor="border-instillGrey20"
        items={tableHeadItems}
      />
      <tbody>
        <tr className="bg-white border border-instillGrey20">
          <ConnectionTypeCell
            width={null}
            padding="py-2 pl-6"
            connectorDefinition={
              pipeline.recipe.source.source_connector_definition
            }
            connectorName={pipeline.recipe.source.id}
          />
          <ModelsCell
            models={pipeline.recipe.models}
            width={null}
            padding="py-2"
          />
          <ConnectionTypeCell
            width={null}
            padding="py-2 pr-6"
            connectorDefinition={
              pipeline.recipe.destination.destination_connector_definition
            }
            connectorName={pipeline.recipe.destination.id}
          />
        </tr>
      </tbody>
    </table>
  );
};
