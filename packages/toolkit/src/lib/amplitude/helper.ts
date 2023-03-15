import { Nullable } from "../type";
import { init, setUserId, track } from "@amplitude/analytics-browser";
import { env } from "../utility";
import { AmplitudeEvent, AmplitudeEventProperties } from "./type";

export const initAmplitude = (userId: Nullable<string>) => {
  if (env("NEXT_PUBLIC_AMPLITUDE_KEY")) {
    init(env("NEXT_PUBLIC_AMPLITUDE_KEY"), userId ? userId : undefined);
  }
};

export const setAmplitudeUserId = (userId: string) => {
  setUserId(userId);
};

export const sendAmplitudeData = (
  eventType: AmplitudeEvent,
  eventProperties: AmplitudeEventProperties
) => {
  track(eventType, {
    ...eventProperties,
    edition: env("NEXT_PUBLIC_CONSOLE_EDITION"),
  });
};
