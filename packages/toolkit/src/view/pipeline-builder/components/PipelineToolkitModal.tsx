import * as React from "react";
import { Button, Dialog, Icons, Tabs } from "@instill-ai/design-system";
import { CodeBlock } from "../../../components";
import { usePipelineBuilderStore } from "../usePipelineBuilderStore";
import { constructPipelineRecipe } from "../lib";

export type PipelineToolkitModalModalProps = {
  snippet: string;
};

export const PipelineToolkitModal = (props: PipelineToolkitModalModalProps) => {
  const { snippet } = props;

  const nodes = usePipelineBuilderStore((state) => state.nodes);

  const recipeString = React.useMemo(() => {
    return JSON.stringify(constructPipelineRecipe(nodes), null, 2);
  }, [nodes]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          className="h-12 w-12 !px-0 !py-0"
          variant="secondaryGrey"
          size="lg"
        >
          <Icons.CodeBrowser className="h-5 w-5 stroke-semantic-fg-primary" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="!max-w-[560px] !h-[475px]">
        <div className="flex flex-col">
          <div className="mb-6 flex flex-row space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-semantic-bg-line">
              <Icons.CodeBrowser className="h-5 w-5 stroke-semantic-fg-primary" />
            </div>
            <div className="flex flex-col">
              <Dialog.Title>Pipeline toolkit</Dialog.Title>
              <Dialog.Description>
                The home of useful gidgets for you to better utilitze VDP
                pipeline.
              </Dialog.Description>
            </div>
          </div>
          <Tabs.Root defaultValue="snippet" className="h-[300px] w-[512px]">
            <Tabs.List className="flex w-full flex-row gap-x-0.5 px-2">
              <Tabs.Trigger value="snippet">Trigger Snippet</Tabs.Trigger>
              <Tabs.Trigger value="recipe">Recipe</Tabs.Trigger>
            </Tabs.List>
            <div className="flex h-full w-full">
              <Tabs.Content value="snippet">
                <CodeBlock
                  codeString={snippet}
                  wrapLongLines={true}
                  language="bash"
                  customStyle={{
                    borderRadius: "0.5rem",
                    fontSize: "10px",
                    backgroundColor: "white",
                    width: "100%",
                  }}
                />
              </Tabs.Content>
              <Tabs.Content value="recipe">
                <CodeBlock
                  codeString={recipeString}
                  wrapLongLines={true}
                  language="bash"
                  customStyle={{
                    borderRadius: "0.5rem",
                    fontSize: "10px",
                    backgroundColor: "white",
                    width: "100%",
                  }}
                />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Root>
  );
};
