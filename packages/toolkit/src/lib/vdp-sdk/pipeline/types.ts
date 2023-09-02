import { ConnectorDefinition, ConnectorResource } from "../connector";
import { Spec, Visibility } from "../types";

export type PipelineMode = "MODE_UNSPECIFIED" | "MODE_SYNC" | "MODE_ASYNC";

export type PipelineReleaseState =
  | "STATE_UNSPECIFIED"
  | "STATE_ACTIVE"
  | "STATE_INACTIVE"
  | "STATE_ERROR"
  | "STATE_DELETED";

export type PipelineRecipe = {
  version: string;
  components: PipelineComponent[];
};

export type PipelineReleaseWatchState = {
  state: PipelineReleaseState;
  progress: number;
};

export type PipelineComponent = {
  id: string;
  resource_name: string;
  resource: ConnectorResource;
  configuration: Record<string, any>;
  definition_name: string;
  type: PipelineComponentType;
  definition: OperatorDefinition | ConnectorDefinition;
};

export type PipelineComponentType =
  | "COMPONENT_TYPE_UNSPECIFIED"
  | "COMPONENT_TYPE_CONNECTOR_AI"
  | "COMPONENT_TYPE_CONNECTOR_DATA"
  | "COMPONENT_TYPE_CONNECTOR_BLOCKCHAIN"
  | "COMPONENT_TYPE_OPERATOR";

export type PipelineReleasesWatchState = Record<
  string,
  PipelineReleaseWatchState
>;

export type Pipeline = {
  name: string;
  uid: string;
  id: string;
  description: string;
  user: string;
  create_time: string;
  update_time: string;
  recipe: PipelineRecipe;
  openapi_schema: Record<string, any>;
  owner: string;
};

export type OperatorDefinition = {
  name: string;
  uid: string;
  id: string;
  title: string;
  documentation_url: string;
  icon: string;
  spec: Spec;
  tombstone: boolean;
  public: boolean;
  custom: boolean;
  icon_url: string;
};

export type PipelineRelease = {
  name: string;
  uid: string;
  id: string;
  description: string;
  recipe: PipelineRecipe;
  create_time: string;
  update_time: string;
  visibility: Visibility;
  openapi_schema: Record<string, any>;
};

export type PipelineTrace = {
  success: boolean;
  inputs: Record<string, any>[];
  outputs: Record<string, any>[];
  error: Record<string, any>;
  compute_time_in_seconds: number;
};

export type PipelineTriggerMetadata = {
  traces: Record<string, PipelineTrace>;
};
