import { Root } from "@/components/Root";

import {
  useWatchDestinations,
  DestinationsTable,
  useDestinationsWithPipelines,
} from "@instill-ai/toolkit";

const DestinationsTablePage = () => {
  const destinations = useDestinationsWithPipelines({
    accessToken: null,
    enable: true,
  });

  const destinationsWatchState = useWatchDestinations({
    destinationNames: destinations.isSuccess
      ? destinations.data.map((p) => p.name)
      : [],
    accessToken: null,
    enable: destinations.isSuccess,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        <DestinationsTable
          destinations={destinations.data ?? []}
          destinationsWatchState={
            destinationsWatchState.isSuccess
              ? destinationsWatchState.data
              : null
          }
          marginBottom={null}
        />
      </div>
    </Root>
  );
};

export default DestinationsTablePage;
