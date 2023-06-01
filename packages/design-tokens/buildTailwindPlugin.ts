import { tokens } from "./build/tailwind/sd-tokens";
import fs from "fs/promises";

async function main() {
  const semanticColours = tokens.filter(
    (e) => e.type === "color" && e.filePath === "tokens/semantic/colour.json"
  );
  const boxShadow = tokens.filter((e) => e.type === "boxShadow");
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

  const configuration = `module.export = {
    content: [
      "src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          ${semanticColours
            .map((e) => `"${e.name}": "var(--${e.name})"`)
            .join(",\n")}
        },
        borderWidth: {${borderWitdhString}},
        opacity: {${opacityString}},
        spacing: {${spacingString}},
        borderRadius: {${borderRadiusString}}
      },
    },
    plugins: [
      ({ addUtilities }) => {
        addUtilities({${typographyUtility.join(",\n")}})
      },
    ],
  }`;

  try {
    await fs.writeFile("tailwind.config.js", configuration);
  } catch (err) {
    console.log(err);
  }
}

main();
