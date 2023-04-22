import { useEffect, useState } from "react";

export function useDelayedLoading(loadingDeps: boolean[], delay: number = 500) {
  // We delay the loading animation by 500ms to avoid a flickering effect
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loadingDeps.every((e) => e === false)) return;

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [...loadingDeps, delay]);

  return isLoading;
}
