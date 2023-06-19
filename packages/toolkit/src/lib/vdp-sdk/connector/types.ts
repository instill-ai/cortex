import { Nullable } from "../../type";
import type { JSONSchema7 } from "json-schema";

/* eslint-disable  @typescript-eslint/no-explicit-any */

export type ConnectorState =
  | "STATE_CONNECTED"
  | "STATE_DISCONNECTED"
  | "STATE_ERROR"
  | "STATE_UNSPECIFIED";

export type Connector = {
  description: string;
  configuration: Record<string, any>;
  tombstone: boolean;
  user: string;
  org: string;
  create_time: string;
  update_time: string;
  state: ConnectorState;
};

export type ConnectorDefinition = {
  name: string;
  uid: string;
  id: string;
  connector_definition: {
    title: string;
    documentation_url: string;
    icon: string;
    connection_type: string;
    spec: {
      documentation_url: string;
      connection_specification: JSONSchema7;
    };
    tombstone: boolean;
    public: boolean;
    custom: boolean;
  };
};

export type ConnectorWatchState = {
  state: ConnectorState;
  progress: number;
};

export type ConnectorsWatchState = Record<string, ConnectorWatchState>;
