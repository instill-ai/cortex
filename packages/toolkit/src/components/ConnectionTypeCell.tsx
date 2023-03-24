import cn from "clsx";
import Image from "next/image";
import { ConnectorDefinition } from "../lib";

export type ConnectionTypeCellProps = {
  connectorName: string;
  connectorDefinition: ConnectorDefinition;
  width: string;
};

export const ConnectionTypeCell = ({
  connectorDefinition,
  connectorName,
  width,
}: ConnectionTypeCellProps) => {
  return (
    <td>
      <div className={cn("py-2.5", width)}>
        <div className="flex flex-row gap-x-[5px]">
          <Image
            className="my-auto"
            src={
              connectorDefinition.connector_definition.docker_repository.split(
                "/"
              )[0] === "airbyte"
                ? `/icons/airbyte/${connectorDefinition.connector_definition.icon}`
                : `/icons/instill/${connectorDefinition.connector_definition.icon}`
            }
            width={30}
            height={30}
            alt={`${connectorName}-icon`}
          />
          <p
            className={cn(
              "my-auto text-instillGrey90 text-instill-body line-clamp-1"
            )}
          >
            {connectorDefinition.connector_definition.title}
          </p>
        </div>
      </div>
    </td>
  );
};
