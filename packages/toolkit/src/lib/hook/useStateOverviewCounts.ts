import {
  ConnectorsWatchState,
  Destination,
  DestinationWithPipelines,
  Model,
  type ModelsWatchState,
  type Pipeline,
  type PipelinesWatchState,
  type Source,
  type SourceWithPipelines,
} from "../vdp-sdk";
import { Nullable } from "../type";
import { useEffect, useState } from "react";

type Item =
  | Pipeline
  | Source
  | Destination
  | DestinationWithPipelines
  | SourceWithPipelines
  | Model;

export type StateOverviewCounts = {
  online: number;
  offline: number;
  error: number;
};

export function useStateOverviewCounts(
  items: Item[] | null,
  itemsWatchState: Nullable<
    ConnectorsWatchState | ModelsWatchState | PipelinesWatchState
  >
): Nullable<StateOverviewCounts> {
  const [stateOverviewCount, setStateOverviewCount] =
    useState<Nullable<StateOverviewCounts>>(null);

  useEffect(() => {
    if (!items || !items[0] || !itemsWatchState) return;

    const counts: StateOverviewCounts = {
      online: 0,
      offline: 0,
      error: 0,
    };

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

    if (itemNameList[0] === "source-connectors") {
      for (const item of items as Source[]) {
        if ((itemsWatchState as ConnectorsWatchState)[item.name]) {
          const watchState = (itemsWatchState as ConnectorsWatchState)[
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

    if (itemNameList[0] === "destination-connectors") {
      for (const item of items as Destination[]) {
        if ((itemsWatchState as ConnectorsWatchState)[item.name]) {
          const watchState = (itemsWatchState as ConnectorsWatchState)[
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
  }, [items, itemsWatchState]);

  return stateOverviewCount;
}
