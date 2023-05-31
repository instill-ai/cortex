import { makeSdTailwindConfig } from "sd-tailwindcss-transformer";
// import { createDictionary } from "style-dictionary/lib/utils/createDictionary.js";

import StyleDictionaryPackage from "style-dictionary";

function main() {
  StyleDictionaryPackage.registerTransform({
    name: "sizes/px",
    type: "value",
    matcher: function (prop) {
      // You can be more specific here if you only want 'em' units for font sizes
      return [
        "fontSizes",
        "spacing",
        "borderRadius",
        "borderWidth",
        "sizing",
      ].includes(prop.attributes?.category || "");
    },
    transformer: function (prop) {
      // You can also modify the value here if you want to convert pixels to ems
      return parseFloat(prop.original.value) + "px";
    },
  });

  const StyleDictionary = StyleDictionaryPackage.extend({
    source: ["tokens/semantic/*.json"],
    include: ["tokens/global.json"],
    format: {
      tailwindFormat: ({ dictionary }) => {
        return JSON.stringify(dictionary.allTokens);
      },
    },
    platforms: {
      tailwind: {
        transforms: ["attribute/cti", "name/cti/kebab", "sizes/px"],
        buildPath: "build/tailwind/",
        files: [
          {
            destination: "tailwind.config.js",
            format: "tailwindFormat",

            // We don't want to use the style in the global. They are more like a foundation
            // Users of the design token should use the style in the semantic and theme folder
            filter: (token) => token.filePath !== "tokens/global.json",
          },
        ],
      },
    },
  });
  // StyleDictionary.buildAllPlatforms();
  // const StyleDictionary = StyleDictionaryModule.extend(
  //   makeSdTailwindConfig({ source: ["tokens/global.json"], type: "all" })
  // );
  StyleDictionary.buildAllPlatforms();
}

main();
