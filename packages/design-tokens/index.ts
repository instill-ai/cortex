import { makeSdTailwindConfig } from "sd-tailwindcss-transformer";
import StyleDictionaryModule from "style-dictionary";

const types = ["semantic"];

function main() {
  types.map((type) => {
    const StyleDictionary = StyleDictionaryModule.extend(
      makeSdTailwindConfig({ type })
    );

    StyleDictionary.buildAllPlatforms();
  });
}

main();
