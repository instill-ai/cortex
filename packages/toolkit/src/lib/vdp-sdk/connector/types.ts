/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Pipeline } from "../pipeline";

export type ConnectorState =
  | "STATE_CONNECTED"
  | "STATE_DISCONNECTED"
  | "STATE_ERROR"
  | "STATE_UNSPECIFIED";

export type ConnectorVisibility =
  | "VISIBILITY_UNSPECIFIED"
  | "VISIBILITY_PRIVATE"
  | "VISIBILITY_PUBLIC";

export type ConnectorType =
  | "CONNECTOR_TYPE_UNSPECIFIED"
  | "CONNECTOR_TYPE_OPERATOR"
  | "CONNECTOR_TYPE_DESTINATION"
  | "CONNECTOR_TYPE_AI"
  | "CONNECTOR_TYPE_BLOCKCHAIN"
  | "CONNECTOR_TYPE_DATA";

export type Connector = {
  name: string;
  uid: string;
  id: string;
  connector_definition: null;
  connector_definition_name: string;
  connector_type: ConnectorType;
  task: string;
  description: string;
  configuration: Record<string, any> | Record<string, never>;
  state: ConnectorState;
  tombstone: boolean;
  user: string;
  create_time: string;
  update_time: string;
  visibility: ConnectorVisibility;
};

export type ConnectorWithDefinition = Omit<
  Connector,
  "connector_definition" | "configuration"
> & {
  connector_definition: ConnectorDefinition;
  configuration: Record<string, any> | Record<string, never>;
};

export type ConnectorWithPipelines = ConnectorWithDefinition & {
  pipelines: Pipeline[];
};

export type ConnectorDefinition = {
  name: string;
  uid: string;
  id: string;
  title: string;
  documentation_url: string;
  icon: string;
  icon_url: string;
  connector_type: ConnectorType;
  spec: {
    documentation_url: string;
    connection_specification: Record<string, any>;
  };
  tombstone: boolean;
  public: boolean;
  custom: boolean;
  vendor: string;
  vendor_attributes: Record<string, any>;
};

export type ConnectorWatchState = {
  state: ConnectorState;
};

export type ConnectorsWatchState = Record<string, ConnectorWatchState>;
