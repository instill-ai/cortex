import {
  Destination,
  DestinationWithPipelines,
  Model,
  Pipeline,
  Source,
  SourceWithPipelines,
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
  items: Item[] | null
): Nullable<StateOverviewCounts> {
  const [stateOverviewCount, setStateOverviewCount] =
    useState<Nullable<StateOverviewCounts>>(null);

  useEffect(() => {
    if (!items || !items[0]) return;

    const counts: StateOverviewCounts = {
      online: 0,
      offline: 0,
      error: 0,
    };

    const itemNameList = items[0].name.split("/");

    if (itemNameList[0] === "pipelines") {
      for (const item of items as Pipeline[]) {
        if (item.state === "STATE_ACTIVE") {
          counts.online += 1;
        } else if (
          item.state === "STATE_INACTIVE" ||
          item.state === "STATE_UNSPECIFIED"
        ) {
          counts.offline += 1;
        } else {
          counts.error += 1;
        }
      }
      setStateOverviewCount(counts);
      return;
    }

    if (itemNameList[0] === "source-connectors") {
      for (const item of items as Source[]) {
        if (item.connector.state === "STATE_CONNECTED") {
          counts.online += 1;
        } else if (
          item.connector.state === "STATE_DISCONNECTED" ||
          item.connector.state === "STATE_UNSPECIFIED"
        ) {
          counts.offline += 1;
        } else {
          counts.error += 1;
        }
      }
      setStateOverviewCount(counts);
      return;
    }

    if (itemNameList[0] === "destination-connectors") {
      for (const item of items as Destination[]) {
        if (item.connector.state === "STATE_CONNECTED") {
          counts.online += 1;
        } else if (
          item.connector.state === "STATE_DISCONNECTED" ||
          item.connector.state === "STATE_UNSPECIFIED"
        ) {
          counts.offline += 1;
        } else {
          counts.error += 1;
        }
      }
      setStateOverviewCount(counts);
      return;
    }

    for (const item of items as Model[]) {
      if (item.state === "STATE_ONLINE") {
        counts.online += 1;
      } else if (
        item.state === "STATE_OFFLINE" ||
        item.state === "STATE_UNSPECIFIED"
      ) {
        counts.offline += 1;
      } else {
        counts.error += 1;
      }
    }

    setStateOverviewCount(counts);
  }, [items]);

  return stateOverviewCount;
}
