import * as React from "react";
import { AddConnectorResourceDialog } from "../pipeline-builder";
import { GeneralPageProp, useUser, useUserConnectorResources } from "../../lib";
import dynamic from "next/dynamic";

const ResourcesTable = dynamic(
  () => import("../ResourcesTable").then((mod) => mod.ResourcesTable),
  { ssr: false }
);

export type ResourcesPageMainViewProps = Omit<GeneralPageProp, "router">;

export const ResourcesPageMainView = (props: ResourcesPageMainViewProps) => {
  const { enableQuery, accessToken } = props;
  const [addConnectorDialogIsOpen, seteAddConnectorDialogIsOpen] =
    React.useState(false);

  /* -------------------------------------------------------------------------
   * Query resource data
   * -----------------------------------------------------------------------*/

  const user = useUser({
    enabled: enableQuery,
    accessToken,
  });

  const userConnectorResources = useUserConnectorResources({
    userName: user.isSuccess ? user.data.name : null,
    enabled: enableQuery && user.isSuccess,
    connectorResourceType: "all",
    accessToken,
  });

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <div className="flex flex-col">
      <div className="mb-8 flex">
        <AddConnectorResourceDialog
          open={addConnectorDialogIsOpen}
          onOpenChange={(open) => seteAddConnectorDialogIsOpen(open)}
          accessToken={accessToken}
          type="inResource"
          onSelectConnectorResource={() => {
            seteAddConnectorDialogIsOpen(false);
          }}
          enableQuery={enableQuery}
        />
      </div>
      <ResourcesTable
        connectorResources={
          userConnectorResources.isSuccess ? userConnectorResources.data : []
        }
        isError={userConnectorResources.isError}
        isLoading={userConnectorResources.isLoading}
        accessToken={accessToken}
      />
    </div>
  );
};
