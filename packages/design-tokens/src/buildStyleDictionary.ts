import StyleDictionaryPackage from "style-dictionary";

function main() {
  StyleDictionaryPackage.registerTransform({
    name: "sizes/px",
    type: "value",
    matcher: function (prop) {
      // You can be more specific here if you only want 'em' units for font sizes
      return [
        "fontSize",
        "spacing",
        "borderRadius",
        "borderWidth",
        "sizing",
        "lineHeight",
      ].includes(prop.original.type || "");
    },
    transformer: function (prop) {
      // You can also modify the value here if you want to convert pixels to ems
      return parseFloat(prop.original.value) + "px";
    },
  });

  generateSemantic();
  generateTheme([
    {
      themeName: "light",
      themePath: "tokens/theme/light.json",
    },
  ]);
}

main();

function generateSemantic() {
  const StyleDictionary = StyleDictionaryPackage.extend({
    source: ["tokens/global.json", "tokens/semantic/*.json"],
    format: {
      tailwindFormat: ({ dictionary }) => {
        return `export const tokens = ${JSON.stringify(dictionary.allTokens)}`;
      },
    },
    platforms: {
      tailwind: {
        transforms: ["attribute/cti", "name/cti/kebab", "sizes/px"],
        buildPath: "dist/semantic/",
        files: [
          {
            destination: "sd-tokens.ts",
            format: "tailwindFormat",

            // We don't want to use the style in the global. They are more like a foundation
            // Users of the design token should use the style in the semantic and theme folder
            filter: (token) => token.filePath !== "tokens/global.json",
          },
        ],
      },
    },
  });

  StyleDictionary.buildAllPlatforms();
}

function generateTheme(themes: { themeName: string; themePath: string }[]) {
  for (const theme of themes) {
    const StyleDictionary = StyleDictionaryPackage.extend({
      source: ["tokens/global.json", theme.themePath],
      format: {
        cssVariables: ({ dictionary }) => {
          const colours = dictionary.allTokens.filter(
            (e) => e.type === "color"
          );
          const colourCSS = colours
            .map((e) => `--${e.name}: ${e.value};`)
            .join("\n");

          const boxShadows = dictionary.allTokens.filter(
            (e) => e.type === "boxShadow"
          );
          const boxShadowCSS = boxShadows
            .map(
              (e) =>
                `--${e.name}: ${e.value.x}px ${e.value.y}px ${e.value.blur}px ${e.value.spread}px ${e.value.color};`
            )
            .join("\n");

          return `.${theme.themeName} {
            ${colourCSS}
            ${boxShadowCSS}
          }`;
        },
      },
      platforms: {
        tailwind: {
          transforms: ["attribute/cti", "name/cti/kebab", "sizes/px"],
          buildPath: "dist/theme/",
          files: [
            {
              destination: `${theme.themeName}.css`,
              format: "cssVariables",

              // We don't want to use the style in the global. They are more like a foundation
              // Users of the design token should use the style in the semantic and theme folder
              filter: (token) => token.filePath !== "tokens/global.json",
            },
          ],
        },
      },
    });

    StyleDictionary.buildAllPlatforms();
  }
}
