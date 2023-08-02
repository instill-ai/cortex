import { ConnectorPreset, IncompleteConnectorWithWatchState } from "../type";
import { ConnectorDefinition, ConnectorType } from "../vdp-sdk";

export const blockchains: ConnectorPreset[] = [
  {
    id: "Numbers",
    name: "connectors/numbers",
    connector_definition_name: "connector-definitions/blockchain-numbers",
    configuration: {
      asset_type: "images",
    },
  },
];

export const ais: ConnectorPreset[] = [
  {
    id: "Instill Model",
    name: "connectors/instill-model",
    connector_definition_name: "connector-definitions/ai-instill-model",
    configuration: {},
  },
  {
    id: "Stability AI",
    name: "connectors/stability-ai",
    connector_definition_name: "connector-definitions/ai-stability-ai",
    configuration: {},
  },
  {
    id: "OpenAI",
    name: "connectors/openai",
    connector_definition_name: "connector-definitions/ai-openai",
    configuration: {},
  },
];

// The reason the id and name is not compatiable in preset is because
// we use id as a displayed value in the leftPanel and name as a identifier
// to find the connector definition. When the dragEnd we will make sure they
// have compatiable value

const sources: ConnectorPreset[] = [
  {
    id: "trigger",
    name: "connectors/trigger",
    connector_definition_name: "connector-definitions/trigger",
    configuration: {},
  },
];

const destinations: ConnectorPreset[] = [
  {
    id: "response",
    name: "connectors/response",
    connector_definition_name: "connector-definitions/response",
    configuration: {},
  },
  {
    id: "PostgresSQL",
    name: "connectors/airbyte-destination-postgres",
    connector_definition_name:
      "connector-definitions/airbyte-destination-postgres",
    configuration: {},
  },
];

export function getAllConnectorPresets(definitions: ConnectorDefinition[]) {
  const constructedPresets: IncompleteConnectorWithWatchState[] = [];

  [...blockchains, ...ais, ...sources, ...destinations].forEach((preset) => {
    const definition = definitions.find(
      (definition) => definition.name === preset.connector_definition_name
    );

    if (definition) {
      constructedPresets.push({
        ...preset,
        connector_definition: definition,
        watchState: "STATE_UNSPECIFIED",
        connector_type: definition.connector_type,
      });
    }
  });

  return constructedPresets;
}

export function getConnectorPresets(
  type: ConnectorType,
  definitions: ConnectorDefinition[]
) {
  switch (type) {
    case "CONNECTOR_TYPE_OPERATOR": {
      const constructedPresets: IncompleteConnectorWithWatchState[] = [];

      sources.forEach((preset) => {
        const definition = definitions.find(
          (definition) => definition.name === preset.connector_definition_name
        );

        if (definition) {
          constructedPresets.push({
            ...preset,
            connector_definition: definition,
            watchState: "STATE_UNSPECIFIED",
            connector_type: definition.connector_type,
          });
        }
      });

      return constructedPresets;
    }
    case "CONNECTOR_TYPE_DATA": {
      const constructedPresets: IncompleteConnectorWithWatchState[] = [];

      destinations.forEach((preset) => {
        const definition = definitions.find(
          (definition) => definition.name === preset.connector_definition_name
        );

        if (definition) {
          constructedPresets.push({
            ...preset,
            connector_definition: definition,
            watchState: "STATE_UNSPECIFIED",
            connector_type: definition.connector_type,
          });
        }
      });

      return constructedPresets;
    }

    case "CONNECTOR_TYPE_AI": {
      const constructedPresets: IncompleteConnectorWithWatchState[] = [];

      ais.forEach((preset) => {
        const definition = definitions.find(
          (definition) => definition.name === preset.connector_definition_name
        );

        if (definition) {
          constructedPresets.push({
            ...preset,
            connector_definition: definition,
            watchState: "STATE_UNSPECIFIED",
            connector_type: definition.connector_type,
          });
        }
      });

      return constructedPresets;
    }

    case "CONNECTOR_TYPE_BLOCKCHAIN": {
      const constructedPresets: IncompleteConnectorWithWatchState[] = [];

      blockchains.forEach((preset) => {
        const definition = definitions.find(
          (definition) => definition.name === preset.connector_definition_name
        );

        if (definition) {
          constructedPresets.push({
            ...preset,
            connector_definition: definition,
            watchState: "STATE_UNSPECIFIED",
            connector_type: definition.connector_type,
          });
        }
      });

      return constructedPresets;
    }

    default:
      throw new Error("Invalid connector type");
  }
}
