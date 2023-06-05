
## Preface

To speed up the development, avoid the silo effect between the design and development teams, and reduce the cost of the development(especially the light/dark theme). We decide to embrace a set rule of design tokens. [^1]

## Package structure

## How it works

We have the tokens studio plugin installed in our Figma editor. Whenever designers have a new set of tokens, they can use the sync functionality to push new tokens to this GitHub repo and create a new PR based on the branch.

Once the PR is merged the Github action will be triggered and generate the new tokens file. The new tokens file will be published to the npm registry and can be used by other packages.

## How to use

Install this package.

```bash
pnpm add @instill-ai/design-tokens
```

This package will export a /dist folder and contains the following files:

```
├── dist
│   ├── semantic
│   │   └── sd-tokens.ts <-- Normally you won't have a chance to use this file
│   ├── tailwind.config.cjs <-- The tailwind preset file
│   └── theme
│       ├── dark.css <-- The dark theme CSS variables file
│       ├── light.css <-- The light theme CSS variables file
│       └── root.css <-- The root CSS variables file
```

You need to digest the whole TailwindCSS configuration preset like below and set the rest configuration you need. (If you are building the Instill-AI's product we are not recommended to add extra style besides this preset. If the style is lacking please file the issue in the repo)

```js
module.exports = {
  presets: [require("@instill-ai/design-tokens/dist/tailwind.config.cjs")],
  content: [
    "src/**/*.{js,ts,jsx,tsx}",
  ],
}
```

Then you can import the CSS variables file in your project at the root of the app

```ts
// pages/_app.tsx
import "@instill-ai/design-tokens/dist/theme/root.css";
import "@instill-ai/design-tokens/dist/theme/light.css";
import "@instill-ai/design-tokens/dist/theme/dark.css";

// app/layout.tsx
import "@instill-ai/design-tokens/dist/theme/root.css";
import "@instill-ai/design-tokens/dist/theme/light.css";
import "@instill-ai/design-tokens/dist/theme/dark.css";
```

Don't forget to import the base style of TailwindCSS [^2]

## How to switch theme

Initialize the user preference at the root of the app

```ts
// pages/_app.tsx
useLayoutEffect(() => {
  const currentTheme = localStorage.getItem("instill-console-theme")
    ? localStorage.getItem("instill-console-theme")
    : null;

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }
}, []);
```

Toggle the theme in the app

```tsx
<button
  className="font-sans text-semantic-fg-primary"
  onClick={() => {
    const currentTheme = localStorage.getItem("instill-console-theme")
      ? localStorage.getItem("instill-console-theme")
      : null;

    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("instill-console-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("instill-console-theme", "dark");
    }
  }}
>
  Theme switch
</button>
```

## Technological details 

### The Tokens Studio's token

The tokens that come from Token Studio's plugin will be stored in the /tokens folder and committed into git. (The plugin will treat this repo as remote storage. So it's forbidden to directly change the tokens stored in this folder)

The structure will look like this. 

- `global.json`: This file has all the styles a designer needs to construct a proper design-tokens. Right now the owner is our designer Dani.
- `/semantic`: This folder stores the base of the design tokens. We will construct the base TailwindCSS preset from this file
- `/theme`: This folder stores the theme-related tokens. We will construct the theme CSS variables from this file

```
├── tokens
│   ├── $metadata.json
│   ├── $themes.json
│   ├── global.json
│   ├── semantic
│   │   ├── colour.json
│   │   ├── comp.json
│   │   └── typography.json
│   └── theme
│       ├── dark.json
│       └── light.json
```

### The flow

![design-tokens-flow](https://github.com/instill-ai/design-system/assets/57251712/98728c68-0288-453d-9abb-dd11fbfb2ea0)

- Build `sd-tokens` (`./src/buildSDTokens.ts`)
  - Merge `global.json`, `/semantic/*.json`
  - Make every inherited style get what they need
  - Filter out the tokens which have filePath=global.json to remove the base style in the style dictionary tokens.
  - Transform the style dictionary tokens to full tokens list and store them in the `/dist/semantic/sd-tokens.ts` file
- Build `/theme` CSS variables (`./src/buildCSSVariables.ts`)
  - Merge `global.json`, `/theme/*.json`
  - Make every inherited style get what they need
  - Filter out the tokens which have filePath=global.json to remove the base style in the style dictionary tokens.
  - Transform the style dictionary tokens to CSS variables and store them in the `/dist/theme` folder
- Use the `/dist/semantic/sd-tokens.ts` to build the TailwindCSS preset (`./src/buildTailwindPreset`)

### One-to-one mapping

Currently, we are not greedy in transforming all the styles we get from the tokens but only transform a part of it. Here is the style we transform right now.

- color
- boxShadow
- typography
- borderWidth
- opacity
- borderRadius
- spacing
- fontFamilies

If you find out these styles are not enough. Please file issue in this repo.

### Naming agnostic

We are trying to not affect the naming convention of designers by emitting additional naming rules. So we do a lot of naming transformation under the hood. 

Takes fontFamily for example, the tokens that come from the plugin look like

```json
{
  "fontFamilies": {
  "ibm-plex-sans": {
    "value": "IBM Plex Sans",
    "type": "fontFamilies"
  }
},
}
```

The style dictionary will transform it to this and you will notice that it constructs the name to kebab-case. This is due to we are using Style Dictionary pre-defined transforms. `attribute/cti` [^3] will add an attribute object based on the location of the token and `name/cti/kebab`[^4] will create a kebab case name based on the attribute object.

```json
{
  value: "IBM Plex Sans",
  type: "fontFamilies",
  filePath: "tokens/semantic/typography.json",
  isSource: true,
  original: { value: "IBM Plex Sans", type: "fontFamilies" },
  name: "font-families-ibm-plex-sans",
  attributes: { category: "font-families", type: "ibm-plex-sans" },
  path: ["font-families", "ibm-plex-sans"],
}
```

But this will make our tailwind class `font-font-families-ibm-plex-sans`, it's too verbose and increases the bundle size of the CSS files. So we will transform it to `ibm-plex-sans` in the TailwindCSS preset.

```ts
const fontFamilies = tokens.filter((e) => e.type === "fontFamilies");
const fontFamiliesString = fontFamilies
  .map((e) => `"${e.name.replace("font-families-", "")}": "${e.value}"`)
  .join(",\n");

const configuration = `module.exports = {
  theme: {
    fontFamily: {${fontFamiliesString}},
  },
}`;
```

Due to this act, the designer can choose whatever they want to name for the tokens, but they need to stick consistently across different versions.

### How do we achieve the theme switch using CSS variables?

As mentioned by above section , we can switch between dark and light theme by switching the root's data-theme value. This is done by two layer of design.

1. We set the TailwindCSS configuration preset with CSS variable. It will looks like below.

```js
module.exports = {
  theme: {
    colors: {
      "semantic-bg-primary": "var(--semantic-bg-primary)",
    }
  }
}
```

2. We construct the css variable and import them at the root. The css file will looks like below

```css
:root {
  --semantic-bg-primary: #ffffff;
}

[data-theme="light"] {
  --semantic-bg-primary: #ffffff;
}

[data-theme="dark"] {
  --semantic-bg-primary: #23272f;
}
```

So when you switch the `data-theme` value, the `--semantic-bg-primary` will also change. Which makes the theme switch possible.


## Reference 

[^1]: [W3C Design Tokens Technical Reports](https://tr.designtokens.org/)
[^2]: [TailwindCSS - Installation](https://tailwindcss.com/docs/installation)
[^3]: [Style Dictionary - attribute/cti](https://amzn.github.io/style-dictionary/#/transforms?id=attributecti)
[^4]: [Style Dictionary - name/cti/kebab](https://amzn.github.io/style-dictionary/#/transforms?id=namectikebab)
