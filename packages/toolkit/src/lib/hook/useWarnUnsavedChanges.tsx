import { NextRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { Nullable } from "../type";

export type useWarnUnsavedChangesProps = {
  router: NextRouter;
  haveUnsavedChanges: boolean;
  confirmation: string;
  callbackWhenLeave: Nullable<() => void>;
};

export function useWarnUnsavedChanges({
  router,
  haveUnsavedChanges,
  confirmation,
  callbackWhenLeave,
}: useWarnUnsavedChangesProps) {
  const onRouteChangeStart = useCallback(() => {
    if (haveUnsavedChanges) {
      if (window.confirm(confirmation)) {
        if (callbackWhenLeave) callbackWhenLeave();
        return true;
      }
      throw "Abort route change by user's confirmation.";
    }
  }, [haveUnsavedChanges, confirmation, callbackWhenLeave]);

  useEffect(() => {
    router.events.on("routeChangeStart", onRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
    };
  }, [onRouteChangeStart, router.events]);
}
