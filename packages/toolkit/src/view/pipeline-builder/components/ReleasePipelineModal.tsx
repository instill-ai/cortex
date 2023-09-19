import * as z from "zod";
import {
  Button,
  Dialog,
  Form,
  Icons,
  Input,
  Textarea,
  useToast,
} from "@instill-ai/design-system";
import {
  PipelineBuilderStore,
  usePipelineBuilderStore,
} from "../usePipelineBuilderStore";
import { shallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateUserPipelineReleasePayload,
  Nullable,
  getInstillApiErrorMessage,
  useCreateUserPipelineRelease,
} from "../../../lib";
import { constructPipelineRecipe } from "../lib";
import { isAxiosError } from "axios";

const selector = (state: PipelineBuilderStore) => ({
  pipelineName: state.pipelineName,
  pipelineRecipeIsDirty: state.pipelineRecipeIsDirty,
  nodes: state.nodes,
  pipelineIsNew: state.pipelineIsNew,
});

export const ReleasePipelineFormSchema = z.object({
  id: z.string().min(1, { message: "Release Name is required" }),
  description: z.string().optional().nullable(),
});

export type ReleasePipelineModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accessToken: Nullable<string>;
};

export const ReleasePipelineModal = (props: ReleasePipelineModalProps) => {
  const { open, onOpenChange, accessToken } = props;

  const { toast } = useToast();

  const { pipelineName, nodes, pipelineRecipeIsDirty, pipelineIsNew } =
    usePipelineBuilderStore(selector, shallow);

  const form = useForm<z.infer<typeof ReleasePipelineFormSchema>>({
    resolver: zodResolver(ReleasePipelineFormSchema),
  });

  const releasePipelineVersion = useCreateUserPipelineRelease();

  function onSubmit(formData: z.infer<typeof ReleasePipelineFormSchema>) {
    if (!pipelineName) return;

    const payload: CreateUserPipelineReleasePayload = {
      id: formData.id,
      description: formData.description ?? undefined,
      recipe: constructPipelineRecipe(nodes),
    };

    releasePipelineVersion.mutate(
      {
        pipelineName,
        payload,
        accessToken,
      },
      {
        onSuccess: () => {
          form.reset({
            id: "",
            description: null,
          });

          toast({
            title: "Successfully release pipeline",
            variant: "alert-success",
            size: "small",
          });

          onOpenChange(false);
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            toast({
              title: "Something went wrong when release pipeline",
              variant: "alert-error",
              size: "large",
              description: getInstillApiErrorMessage(error),
            });
          } else {
            toast({
              title: "Something went wrong when release pipeline",
              variant: "alert-error",
              size: "large",
              description: "Please try again later",
            });
          }
        },
      }
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e)}>
      <Dialog.Trigger asChild>
        <Button
          variant="primary"
          size="lg"
          disabled={pipelineRecipeIsDirty || pipelineIsNew}
        >
          Release
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="!max-w-[560px]">
        <div className="flex flex-col">
          <div className="flex flex-col mb-5">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[10px] border border-semantic-bg-line">
              <Icons.CodeBrowser className="h-5 w-5 stroke-semantic-fg-primary" />
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="product-body-text-1-semibold text-semantic-fg-primary">
                Release Pipeline
              </p>
              <p className="product-body-text-3-regular text-semantic-fg-disabled">
                Please enter a name and description for this release version.
              </p>
            </div>
          </div>
          <Form.Root {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-3 mb-8">
                <Form.Field
                  control={form.control}
                  name="id"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label>Release Name</Form.Label>
                        <Form.Control>
                          <Input.Root>
                            <Input.Core
                              {...field}
                              type="text"
                              value={field.value ?? ""}
                              autoComplete="off"
                            />
                          </Input.Root>
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    );
                  }}
                />
                <Form.Field
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <Form.Item>
                        <Form.Label>Description</Form.Label>
                        <Form.Control>
                          <Textarea {...field} value={field.value ?? ""} />
                        </Form.Control>
                        <Form.Message />
                      </Form.Item>
                    );
                  }}
                />
              </div>
              <div className="flex w-full flex-row gap-x-4">
                <Button
                  type="button"
                  variant="secondaryGrey"
                  size="lg"
                  onClick={() => {
                    form.reset({
                      id: "",
                      description: null,
                    });
                    onOpenChange(false);
                  }}
                  className="!flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="!flex-1"
                >
                  Release
                </Button>
              </div>
            </form>
          </Form.Root>
        </div>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Root>
  );
};
