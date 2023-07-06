import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export type CodeBlockProps = {
  codeString: string;
} & Omit<React.ComponentProps<typeof SyntaxHighlighter>, "style">;

export const CodeBlock = (props: CodeBlockProps) => {
  const { codeString, ...passThrough } = props;

  return (
    <SyntaxHighlighter style={docco} {...passThrough}>
      {codeString}
    </SyntaxHighlighter>
  );
};
