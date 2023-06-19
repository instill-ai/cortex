import { DataDestinationIcon, DataSourceIcon } from "@instill-ai/design-system";
import cn from "clsx";
import {
  ConnectorDefinition,
  Nullable,
  PipelineConnectorComponentDefinition,
} from "../../lib";
import { ImageWithFallback } from "../ImageWithFallback";

export type ConnectionTypeCellProps = {
  connectorName: Nullable<string>;
  connectorDefinition: Nullable<
    ConnectorDefinition | PipelineConnectorComponentDefinition
  >;
  width: Nullable<string>;
  padding: string;
};

export const ConnectionTypeCell = ({
  connectorDefinition,
  connectorName,
  width,
  padding,
}: ConnectionTypeCellProps) => {
  console.log(11111, connectorDefinition)
  return (
    <td>
      <div className={cn("py-2.5", width, padding)}>
        {connectorDefinition ? (
          <div className="flex flex-row gap-x-[5px]">
            <ImageWithFallback
              src={
                connectorDefinition.id.startsWith("airbyte")
                  ? `/icons/airbyte/${connectorDefinition.connector_definition.icon}`
                  : `/icons/instill/${connectorDefinition.connector_definition.icon}`
              }
              width={24}
              height={24}
              alt={`${connectorName}-icon`}
              fallbackImg={
                connectorDefinition.name.split("/")[0].split("-")[0] ===
                "source" ? (
                  <DataSourceIcon
                    width="w-6"
                    height="h-6"
                    color="fill-instillGrey90"
                    position="my-auto"
                  />
                ) : (
                  <DataDestinationIcon
                    width="w-6"
                    height="h-6"
                    color="fill-instillGrey90"
                    position="my-auto"
                  />
                )
              }
            />
            <p
              className={cn(
                "my-auto text-instillGrey90 text-instill-body line-clamp-1"
              )}
            >
              {connectorDefinition.connector_definition.title}
            </p>
          </div>
        ) : null}
      </div>
    </td>
  );
};
