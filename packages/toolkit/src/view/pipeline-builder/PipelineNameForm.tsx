import * as React from "react";
import * as z from "zod";
import cn from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@instill-ai/design-system";
import { shallow } from "zustand/shallow";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Nullable,
  PipelineBuilderStore,
  usePipelineBuilderStore,
  useWatchPipeline,
} from "../../lib";

const PipelineNameFormSchema = z.object({
  pipelineId: z.string().nullable(),
});

const pipelineBuilderSelector = (state: PipelineBuilderStore) => ({
  pipelineId: state.pipelineId,
  setPipelineId: state.setPipelineId,
});

export type PipelineNameFormProps = { accessToken: Nullable<string> };

export const PipelineNameForm = (props: PipelineNameFormProps) => {
  const { accessToken } = props;
  const router = useRouter();

  const { id } = router.query;

  const { pipelineId, setPipelineId } = usePipelineBuilderStore(
    pipelineBuilderSelector,
    shallow
  );
  const [isFocused, setIsFocused] = React.useState(false);

  const form = useForm<z.infer<typeof PipelineNameFormSchema>>({
    resolver: zodResolver(PipelineNameFormSchema),
  });

  const pipelineWatchState = useWatchPipeline({
    pipelineName: `pipelines/${id}`,
    enabled: !!id,
    accessToken,
  });

  React.useEffect(() => {
    form.reset({
      pipelineId: router.asPath.split("/")[2],
    });
  }, [router.isReady, router.asPath, form]);

  React.useEffect(() => {
    if (!pipelineId) return;
    form.reset({
      pipelineId,
    });
  }, [pipelineId, form]);

  return (
    <Form.Root {...form}>
      <div className="flex w-full flex-row space-x-2 pl-4">
        {pipelineWatchState.isSuccess ? (
          <div className="my-auto flex h-4 w-4 items-center justify-center">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                pipelineWatchState.data.state === "STATE_ERROR"
                  ? "bg-semantic-error-default"
                  : pipelineWatchState.data.state === "STATE_ACTIVE"
                  ? "bg-semantic-success-default"
                  : "bg-semantic-bg-secondary"
              )}
            />
          </div>
        ) : null}
        <Link
          className={cn(
            "mr-2 flex flex-row space-x-2",
            isFocused ? "hidden" : ""
          )}
          href="/pipelines"
        >
          <p className="my-auto text-semantic-bg-secondary product-headings-heading-6">
            Pipelines
          </p>
          <p className="my-auto pb-0.5 text-semantic-bg-secondary product-headings-heading-6">
            /
          </p>
        </Link>
        <form className="my-auto flex flex-1 flex-row items-center justify-center">
          <Form.Field
            control={form.control}
            name="pipelineId"
            render={({ field }) => {
              return (
                <input
                  className="w-[360px] bg-transparent py-2 text-semantic-bg-primary product-headings-heading-6 focus:outline-none focus:ring-0"
                  {...field}
                  value={field.value ?? "Untitled Pipeline"}
                  type="text"
                  autoComplete="off"
                  onFocus={() => setIsFocused(true)}
                  onChange={(e) => {
                    field.onChange(e);
                    setPipelineId(e.target.value);
                  }}
                  onBlur={() => setIsFocused(false)}
                />
              );
            }}
          />
        </form>
      </div>
    </Form.Root>
  );
};
