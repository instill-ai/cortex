import { tokens } from "../dist/semantic/sd-tokens";
import fs from "fs/promises";
import path from "path";

async function main() {
  const semanticColours = tokens.filter(
    (e) => e.type === "color" && e.filePath === "tokens/semantic/colour.json"
  );
  const semanticBoxShadow = tokens.filter(
    (e) =>
      e.type === "boxShadow" && e.filePath === "tokens/semantic/colour.json"
  );

  const typography = tokens.filter((e) => e.type === "typography");
  const borderWidth = tokens.filter((e) => e.type === "borderWidth");
  const borderWitdhString = borderWidth
    .map((e) => `"${e.name.split("-")[2]}": "${e.value}"`)
    .join(",\n");

  const opacity = tokens.filter((e) => e.type === "opacity");
  const opacityString = opacity
    .map((e) => `"${e.name.split("-")[2]}": "${e.value}"`)
    .join(",\n");

  const spacing = tokens.filter((e) => e.type === "spacing");
  const spacingString = spacing
    .map((e) => `"${e.name.split("-")[2]}": "${e.value}"`)
    .join(",\n");

  const borderRadius = tokens.filter((e) => e.type === "borderRadius");
  const borderRadiusString = borderRadius
    .map((e) => `"${e.name.split("-")[1]}": "${e.value}"`)
    .join(",\n");

  const typographyUtility = typography.map((e) => {
    const { name, value } = e;
    return `".${name}": ${JSON.stringify(value)}`;
  });

  // The name of the token will look like font-families-ibm-plex-sans and
  // we only need ibm-plex-sans

  const fontFamilies = tokens.filter((e) => e.type === "fontFamilies");
  const fontFamiliesString = fontFamilies
    .map((e) => `"${e.name.replace("font-families-", "")}": "${e.value}"`)
    .join(",\n");

  const configuration = `module.exports = {
    theme: {
      extend: {
        colors: {
          ${semanticColours
            .map((e) => `"${e.name}": "var(--${e.name})"`)
            .join(",\n")}
        },
        boxShadow: {
          ${semanticBoxShadow
            .map((e) => `"${e.name.split("-")[1]}": "var(--${e.name})"`)
            .join(",\n")}
        },
        fontFamily: {${fontFamiliesString}},
        borderWidth: {${borderWitdhString}},
        opacity: {${opacityString}},
        spacing: {${spacingString}},
        borderRadius: {${borderRadiusString}}
      }
    },
    plugins: [
      ({ addUtilities }) => {
        addUtilities({${typographyUtility.join(",\n")}})
      },
    ],
  }`;

  try {
    await fs.writeFile(path.resolve("dist/tailwind.config.cjs"), configuration);
  } catch (err) {
    console.log(err);
  }
}

main();
