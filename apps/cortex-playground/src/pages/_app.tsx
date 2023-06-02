import "@/styles/globals.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@instill-ai/toolkit";
import type { AppProps } from "next/app";
import "@instill-ai/design-system/dist/index.css";
import "@instill-ai/design-tokens/dist/theme/root.css";
import "@instill-ai/design-tokens/dist/theme/light.css";
import "@instill-ai/design-tokens/dist/theme/dark.css";
import { useLayoutEffect } from "react";

export const queryCache = new QueryCache();
export const queryClient = new QueryClient({ queryCache });

export default function App({ Component, pageProps }: AppProps) {
  useLayoutEffect(() => {
    const currentTheme = localStorage.getItem("instill-console-theme")
      ? localStorage.getItem("instill-console-theme")
      : null;

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
      <div id="modal-root" />
    </QueryClientProvider>
  );
}
