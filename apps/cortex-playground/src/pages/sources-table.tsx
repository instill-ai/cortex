import { Root } from "@/components/Root";

import {
  useWatchDestinations,
  SourcesTable,
  useDestinationsWithPipelines,
  useSourcesWithPipelines,
  useWatchSources,
} from "@instill-ai/toolkit";

const SourcesTablePage = () => {
  const sources = useSourcesWithPipelines({
    accessToken: null,
    enable: true,
  });

  const sourcesWatchState = useWatchSources({
    sourceNames: sources.isSuccess ? sources.data.map((p) => p.name) : [],
    accessToken: null,
    enable: sources.isSuccess,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        <SourcesTable
          sources={sources.data ?? []}
          sourcesWatchState={
            sourcesWatchState.isSuccess ? sourcesWatchState.data : null
          }
          marginBottom={null}
        />
      </div>
    </Root>
  );
};

export default SourcesTablePage;
