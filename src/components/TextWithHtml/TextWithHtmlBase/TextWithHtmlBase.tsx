import { FC } from "react";
import sanitizeHtml from "sanitize-html";
import cn from "clsx";

/**
 * This component will allow some default attribute plus "a" and "rel"
 * ref:
 *   - https://stackoverflow.com/a/69940844
 *   - https://github.com/airbytehq/airbyte/blob/59e20f20de73ced59ae2c782612fa7554fc1fced/airbyte-webapp/src/components/TextWithHTML/TextWithHTML.tsx
 */

const allowedAttributes = {
  ...sanitizeHtml.defaults.allowedAttributes,
  a: [...sanitizeHtml.defaults.allowedAttributes["a"], "rel"],
};

export type TextWithHtmlBaseProps = {
  text: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  textColor: string;
};

const TextWithHtmlBase: FC<TextWithHtmlBaseProps> = ({
  text,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textColor,
}) => {
  if (!text) return null;

  const sanitizedHtmlText = sanitizeHtml(text, {
    allowedAttributes,
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noopener noreferrer",
      }),
    },
  });

  return (
    <span
      className={cn(fontFamily, fontSize, fontWeight, lineHeight, textColor)}
      dangerouslySetInnerHTML={{ __html: sanitizedHtmlText }}
    />
  );
};

export default TextWithHtmlBase;
