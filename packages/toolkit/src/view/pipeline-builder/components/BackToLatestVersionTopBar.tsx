import { shallow } from "zustand/shallow";
import {
  PipelineBuilderStore,
  usePipelineBuilderStore,
} from "../usePipelineBuilderStore";
import { Nullable } from "../../../lib";
import { useSortedReleases } from "../lib";

const selector = (state: PipelineBuilderStore) => ({
  pipelineName: state.pipelineName,
  pipelineIsNew: state.pipelineIsNew,
  isLatestVersion: state.isLatestVersion,
  updateIsLatestVersion: state.updateIsLatestVersion,
  updateCurrentVersion: state.updateCurrentVersion,
});

export type BackToLatestVersionTopBarProps = {
  accessToken: Nullable<string>;
  enableQuery: boolean;
};

export const BackToLatestVersionTopBar = (
  props: BackToLatestVersionTopBarProps
) => {
  const { accessToken, enableQuery } = props;
  const {
    pipelineName,
    pipelineIsNew,
    isLatestVersion,
    updateCurrentVersion,
    updateIsLatestVersion,
  } = usePipelineBuilderStore(selector, shallow);

  const sortedReleases = useSortedReleases({
    pipelineName,
    accessToken,
    enableQuery: pipelineIsNew ? false : enableQuery,
  });

  return (
    <>
      {isLatestVersion || sortedReleases.length === 0 ? null : (
        <div className="flex flex-col bg-semantic-bg-base-bg w-full h-8">
          <p className="m-auto">
            <span className="product-body-text-4-medium text-semantic-fg-secondary ">
              You are viewing a past version of this pipeline.
            </span>
            {` `}
            <span
              className="hover:!underline text-semantic-accent-default cursor-pointer product-body-text-4-medium"
              onClick={() => {
                updateCurrentVersion(() => sortedReleases[0]?.id);
                updateIsLatestVersion(() => true);
              }}
            >
              Click Here
            </span>
            {` `}
            <span className="product-body-text-4-medium text-semantic-fg-secondary">
              for the latest version.
            </span>
          </p>
        </div>
      )}
    </>
  );
};
