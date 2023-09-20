import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

export type CodeBlockProps = {
  codeString: string;
} & Omit<React.ComponentProps<typeof SyntaxHighlighter>, "style">;

export const CodeBlock = (props: CodeBlockProps) => {
  const { codeString, ...passThrough } = props;

  return (
    <div className="flex flex-1 w-full h-full relative">
      <div className="absolute top-3 right-3">
        <CopyToClipboardButton
          className="border-0 !px-1 !py-1"
          text={codeString}
        />
      </div>
      <SyntaxHighlighter style={docco} {...passThrough}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
