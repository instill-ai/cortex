import { Button, Icons, Popover } from "@instill-ai/design-system";
import {
  Nullable,
  getHumanReadableStringFromTime,
  useUser,
  useUserPipelineReleases,
} from "../../../lib";
import { usePipelineBuilderStore } from "../usePipelineBuilderStore";

export type BottomBarProps = {
  enableQuery: boolean;
  accessToken: Nullable<string>;
};

export const BottomBar = (props: BottomBarProps) => {
  const { enableQuery, accessToken } = props;

  const pipelineId = usePipelineBuilderStore((state) => state.pipelineId);

  const user = useUser({
    enabled: enableQuery,
    accessToken,
  });

  const pipelineReleases = useUserPipelineReleases({
    userName: user.isSuccess ? user.data.name : null,
    pipelineName: user.isSuccess
      ? `${user.data.name}/pipelines/${pipelineId}`
      : null,
    enabled: enableQuery && user.isSuccess,
    accessToken,
  });

  return (
    <div className="h-[var(--pipeline-builder-bottom-bar-height)] w-full flex-shrink-0 flex flex-row">
      <Popover.Root>
        <Popover.Trigger asChild={true}>
          <Button
            className="gap-x-2"
            size="sm"
            variant="tertiaryColour"
            type="button"
          >
            <Icons.Tag01 className="w-3 h-3 stroke-semantic-accent-default" />
            Releases
          </Button>
        </Popover.Trigger>
        <Popover.Content
          side="top"
          sideOffset={4}
          align="start"
          className="h-[386px] w-[220px] p-2 flex flex-col !rounded-none"
        >
          <p className="mb-[18px] text-semantic-fg-primary product-body-text-3-semibold">
            Releases
          </p>
          <div className="flex flex-col gap-y-4">
            {pipelineReleases.isSuccess ? (
              pipelineReleases.data.length > 0 ? (
                pipelineReleases.data.map((release) => (
                  <div key={release.id} className="flex flex-col">
                    <p className="mb-2 product-body-text-3-medium text-semantic-fg-primary">
                      {release.id}
                    </p>
                    <p className="product-body-text-4-medium text-semantic-fg-disabled">
                      {getHumanReadableStringFromTime(
                        release.create_time,
                        Date.now()
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <div className="product-body-text-4-medium text-semantic-fg-disabled">
                  This pipeline has no released versions.
                </div>
              )
            ) : null}
          </div>
        </Popover.Content>
      </Popover.Root>
      <div className="flex-1 text-center product-body-text-4-medium text-semantic-fg-secondary">
        Pipeline
      </div>

      {/* 
        Placeholder
      */}

      <div className="w-[88px]"></div>
    </div>
  );
};
