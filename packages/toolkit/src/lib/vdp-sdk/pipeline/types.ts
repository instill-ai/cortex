import { Nullable } from "vitest";
import { ConnectorType, ConnectorWithDefinition } from "../connector";

export type PipelineMode = "MODE_UNSPECIFIED" | "MODE_SYNC" | "MODE_ASYNC";

export type PipelineState =
  | "STATE_UNSPECIFIED"
  | "STATE_ACTIVE"
  | "STATE_INACTIVE"
  | "STATE_ERROR"
  | "STATE_DELETED";

export type PipelineRecipe = {
  version: string;
  components: PipelineComponent[];
};

export type PipelineWatchState = {
  state: PipelineState;
  progress: number;
};

export type PipelineComponent = {
  id: string;
  resource_name: string;
  resource_detail: ConnectorWithDefinition;
  metadata: any;
  dependencies: {
    images: string;
    texts: string;
    metadata: string;
    structured_data: string;
  };

  // We will add logic_operator in the future
  type: ConnectorType | string;
};

export type PipelinesWatchState = Record<string, PipelineWatchState>;

export type Pipeline = {
  name: string;
  uid: string;
  id: string;
  description: string;
  state: PipelineState;
  user: string;
  create_time: string;
  update_time: string;
  recipe: PipelineRecipe;
};

export type RawPipelineRecipeComponent = {
  id: string;
  resource_name: string;
  resource_detail?: Record<string, any>;
};
