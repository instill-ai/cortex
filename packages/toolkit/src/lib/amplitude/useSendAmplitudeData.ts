import { useEffect } from "react";
import { sendAmplitudeData } from "./helper";
import { AmplitudeEvent, AmplitudeEventProperties } from "./type";

export const useSendAmplitudeData = (
  event: AmplitudeEvent,
  properties: AmplitudeEventProperties,
  routerIsReady: boolean,
  amplitudeIsReady: boolean
) => {
  useEffect(() => {
    if (!amplitudeIsReady || !routerIsReady) return;

    sendAmplitudeData(event, properties);
  }, [routerIsReady, amplitudeIsReady, event, properties]);
};
