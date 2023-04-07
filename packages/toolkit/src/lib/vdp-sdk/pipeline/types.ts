import { DestinationWithDefinition, SourceWithDefinition } from "../connector";
import { Model } from "../model";

export type PipelineMode = "MODE_UNSPECIFIED" | "MODE_SYNC" | "MODE_ASYNC";

export type PipelineState =
  | "STATE_UNSPECIFIED"
  | "STATE_ACTIVE"
  | "STATE_INACTIVE"
  | "STATE_ERROR";

export type PipelineWithRawRecipe = {
  name: string;
  uid: string;
  id: string;
  description: string;
  recipe: RawPipelineRecipe;
  mode: PipelineMode;
  state: PipelineState;
  user: string;
  org: string;
  create_time: string;
  update_time: string;
};

export type Pipeline = {
  name: string;
  uid: string;
  id: string;
  description: string;
  recipe: PipelineRecipe;
  mode: PipelineMode;
  state: PipelineState;
  user: string;
  org: string;
  create_time: string;
  update_time: string;
};

export type RawPipelineRecipe = {
  source: string;
  destination: string;
  models: string[];
};

export type PipelineRecipe = {
  source: SourceWithDefinition;
  destination: DestinationWithDefinition;
  models: Model[];
};

export type PipelineWatchState = {
  state: PipelineState;
  progress: number;
};

export type PipelinesWatchState = Record<string, PipelineWatchState>;
