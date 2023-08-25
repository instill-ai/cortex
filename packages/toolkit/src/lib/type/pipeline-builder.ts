import {
  ConnectorResource,
  ConnectorDefinition,
  ConnectorResourceState,
  ConnectorResourceType,
  ConnectorResourceWithDefinition,
  Pipeline,
  PipelineState,
  ConnectorResourceWithWatchState,
} from "../vdp-sdk";

export type IncompleteConnectorResourceWithWatchState = {
  id: string;
  name: string;
  connector_definition: ConnectorDefinition;
  connector_definition_name: string;
  watchState: ConnectorResourceState;
} & Pick<ConnectorResourceWithDefinition, "configuration" | "connector_type">;

export type ConnectorNodeData = {
  connectorType: ConnectorResourceType;
  connector:
    | ConnectorResourceWithWatchState
    | IncompleteConnectorResourceWithWatchState;
};

export type ConnectorResourcePreset = {
  connector_definition_name: string;
  id: string;
  name: string;
} & Pick<ConnectorResource, "configuration">;

export type PipelineWithWatchState = {
  watchState: PipelineState;
} & Pipeline;
