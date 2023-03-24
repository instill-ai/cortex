import cn from "clsx";
import { useMemo } from "react";
import {
  ConnectionTypeCell,
  TableLoadingProgress,
  TableHead,
  ModelsCell,
  type TableHeadItem,
} from "../../components";
import type { Nullable, Pipeline } from "../../lib";

export type PipelineTableProps = {
  pipeline: Nullable<Pipeline>;
  isLoading: boolean;
  marginBottom: Nullable<string>;
};

export const PipelineTable = ({
  pipeline,
  isLoading,
  marginBottom,
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
      },
      {
        key: "pipeline-models",
        item: getHeadItem("Model instances"),
      },
      {
        key: "pipeline-destination",
        item: getHeadItem("Destination"),
      },
    ];
  }, []);

  if (isLoading) {
    return <TableLoadingProgress marginBottom={null} />;
  }

  if (!pipeline) {
    return null;
  }

  return (
    <table className={cn("table-auto border-collapse", marginBottom)}>
      <TableHead
        bgColor="bg-instillGrey05"
        borderColor="border-instillGrey20"
        items={tableHeadItems}
      />
      <tbody>
        <tr className="bg-white border border-instillGrey20">
          <ConnectionTypeCell
            width=""
            padding="py-2 pl-6"
            connectorDefinition={
              pipeline.recipe.source.source_connector_definition
            }
            connectorName={pipeline.recipe.source.id}
          />
          <ModelsCell
            modelInstances={pipeline.recipe.models}
            width=""
            padding="py-2"
          />
          <ConnectionTypeCell
            width=""
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
