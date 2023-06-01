import "@/styles/globals.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@instill-ai/toolkit";
import type { AppProps } from "next/app";
import "@instill-ai/design-system/dist/index.css";
import "@instill-ai/design-tokens/dist/theme/light.css";

export const queryCache = new QueryCache();
export const queryClient = new QueryClient({ queryCache });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
      <div id="modal-root" />
    </QueryClientProvider>
  );
}
