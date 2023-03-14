import { ConnectorDefinition } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { useMemo } from "react";
import { transformAirbyteSchemaToAirbyteFormTree } from "../helpers/transformAirbyteSchemaToAirbyteFormTree";

export const useAirbyteFormTree = (
  definition: Nullable<ConnectorDefinition>
) => {
  const formTree = useMemo(() => {
    if (!definition) {
      return null;
    }

    const formTree = transformAirbyteSchemaToAirbyteFormTree(
      definition.connector_definition.spec.connection_specification
    );

    return formTree;
  }, [definition]);

  return formTree;
};
