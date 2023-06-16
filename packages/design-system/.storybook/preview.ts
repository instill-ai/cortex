import { Preview } from "@storybook/react";

import "tailwindcss/tailwind.css";
import "../src/styles/global.css";

// This is a hack to get the design tokens to work in Storybook.
// Storybook use Webpack under the hood, but it doesn't respect
// the sideEffects configuration in the design-tokens
import root from "@instill-ai/design-tokens/dist/theme/root.css";
import light from "@instill-ai/design-tokens/dist/theme/light.css";
import dark from "@instill-ai/design-tokens/dist/theme/dark.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
