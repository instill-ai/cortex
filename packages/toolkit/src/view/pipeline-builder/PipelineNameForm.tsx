import cn from "clsx";
import { shallow } from "zustand/shallow";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Nullable,
  PipelineBuilderStore,
  usePipelineBuilderStore,
  useWatchPipeline,
} from "../../lib";

const pipelineBuilderSelector = (state: PipelineBuilderStore) => ({
  pipelineId: state.pipelineId,
});

export type PipelineNameFormProps = {
  accessToken: Nullable<string>;
  enableQuery: boolean;
};

export const PipelineNameForm = (props: PipelineNameFormProps) => {
  const { accessToken, enableQuery } = props;
  const router = useRouter();

  const { id } = router.query;

  const { pipelineId } = usePipelineBuilderStore(
    pipelineBuilderSelector,
    shallow
  );

  const pipelineWatchState = useWatchPipeline({
    pipelineName: `pipelines/${id}`,
    enabled: !!id && enableQuery,
    accessToken,
  });

  // Disable edit on the topbar
  // React.useEffect(() => {
  //   form.reset({
  //     pipelineId: router.asPath.split("/")[2],
  //   });
  // }, [router.isReady, router.asPath, form]);

  // React.useEffect(() => {
  //   if (!pipelineId) return;
  //   form.reset({
  //     pipelineId,
  //   });
  // }, [pipelineId, form]);

  return (
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
      <Link className={cn("flex flex-row space-x-2")} href="/pipelines">
        <p className="my-auto text-semantic-bg-secondary product-headings-heading-6">
          Pipelines
        </p>
        <p className="my-auto pb-0.5 text-semantic-bg-secondary product-headings-heading-6">
          /
        </p>
        <p className="flex flex-1 my-auto text-semantic-bg-primary product-headings-heading-6">
          {pipelineId}
        </p>
      </Link>

      {/* <form className="my-auto flex flex-1 flex-row items-center justify-center">
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
        </form> */}
    </div>
  );
};
