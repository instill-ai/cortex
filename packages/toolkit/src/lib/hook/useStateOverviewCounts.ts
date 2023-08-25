import type {
  ConnectorResourcesWatchState,
  ConnectorResource,
  ConnectorResourceWithPipelines,
  Model,
  ModelsWatchState,
  Pipeline,
  PipelinesWatchState,
} from "../vdp-sdk";
import { Nullable } from "../type";
import * as React from "react";

type Item =
  | Pipeline
  | ConnectorResource
  | ConnectorResourceWithPipelines
  | Model;

export type StateOverviewCounts = {
  online: number;
  offline: number;
  error: number;
};

export function useStateOverviewCounts(
  items: Item[] | null,
  itemsWatchState: Nullable<
    ConnectorResourcesWatchState | ModelsWatchState | PipelinesWatchState
  >,
  isLoading: boolean
): Nullable<StateOverviewCounts> {
  const [stateOverviewCount, setStateOverviewCount] =
    React.useState<Nullable<StateOverviewCounts>>(null);

  React.useEffect(() => {
    if (!items || !items[0] || !itemsWatchState) return;

    const counts: StateOverviewCounts = {
      online: 0,
      offline: 0,
      error: 0,
    };

    if (isLoading) {
      return;
    }

    const itemNameList = items[0].name.split("/");

    if (itemNameList[0] === "pipelines") {
      for (const item of items as Pipeline[]) {
        if ((itemsWatchState as PipelinesWatchState)[item.name]) {
          const watchState = (itemsWatchState as PipelinesWatchState)[item.name]
            .state;

          if (watchState === "STATE_ACTIVE") {
            counts.online += 1;
          } else if (
            watchState === "STATE_INACTIVE" ||
            watchState === "STATE_UNSPECIFIED"
          ) {
            counts.offline += 1;
          } else {
            counts.error += 1;
          }
        }
      }
      setStateOverviewCount(counts);
      return;
    }

    if (itemNameList[0] === "connectors") {
      for (const item of items as ConnectorResource[]) {
        if ((itemsWatchState as ConnectorResourcesWatchState)[item.name]) {
          const watchState = (itemsWatchState as ConnectorResourcesWatchState)[
            item.name
          ].state;
          if (watchState === "STATE_CONNECTED") {
            counts.online += 1;
          } else if (
            watchState === "STATE_DISCONNECTED" ||
            watchState === "STATE_UNSPECIFIED"
          ) {
            counts.offline += 1;
          } else {
            counts.error += 1;
          }
        }
      }
      setStateOverviewCount(counts);
      return;
    }

    for (const item of items as Model[]) {
      if ((itemsWatchState as ModelsWatchState)[item.name]) {
        const watchState = (itemsWatchState as ModelsWatchState)[item.name]
          .state;
        if (watchState === "STATE_ONLINE") {
          counts.online += 1;
        } else if (
          watchState === "STATE_OFFLINE" ||
          watchState === "STATE_UNSPECIFIED"
        ) {
          counts.offline += 1;
        } else {
          counts.error += 1;
        }
      }
    }

    setStateOverviewCount(counts);
  }, [items, itemsWatchState, isLoading]);

  return stateOverviewCount;
}
