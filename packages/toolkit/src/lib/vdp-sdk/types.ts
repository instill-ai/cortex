/* eslint-disable @typescript-eslint/no-explicit-any */

import { ConnectorResourceState } from "./connector";
import { ModelState } from "./model";
import { PipelineState } from "./pipeline";

export type ErrorDetails = {
  "@type": string;
  violations?: Violation[];
  description?: string;
};

export type Violation = {
  type: string;
  description: string;
  subject: string;
};

export type ResourceState = ModelState | PipelineState | ConnectorResourceState;
