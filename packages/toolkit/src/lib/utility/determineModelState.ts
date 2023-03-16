import { ModelInstance, ModelState } from "../vdp-sdk";

export function determineModelState(
  modelInstances: ModelInstance[]
): ModelState {
  if (modelInstances.some((e) => e.state === "STATE_ERROR")) {
    return "STATE_ERROR";
  } else if (modelInstances.some((e) => e.state === "STATE_ONLINE")) {
    return "STATE_ONLINE";
  } else {
    return "STATE_OFFLINE";
  }
}
