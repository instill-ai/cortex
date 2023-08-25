import { ConnectorResourceWithPipelines, Model, Pipeline } from "../vdp-sdk";
import { Nullable } from "../type";
import * as React from "react";

type Resources = ConnectorResourceWithPipelines | Model | Pipeline;

export function useSearchedResources<T extends Resources>({
  resources,
  searchTerm,
}: {
  resources: T[];
  searchTerm: Nullable<string>;
}) {
  const [searchedResources, setSearchedResources] = React.useState<T[]>([]);

  React.useEffect(() => {
    if (!searchTerm) {
      return;
    }

    // We need to consider using the tanstack-table

    const searchResources = async (resources: T[], searchTerm: string) => {
      const Fuse = (await import("fuse.js")).default;
      const fuse = new Fuse(resources, {
        keys: ["id", "instances.id"],
        threshold: 0.5,
      });

      setSearchedResources(fuse.search(searchTerm).map((e) => e.item));
    };

    searchResources(resources, searchTerm);
  }, [resources, searchTerm]);

  return searchedResources;
}
