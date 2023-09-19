import { PageTitle } from "../../components";
import { GeneralPageProp } from "../../lib";
import { CreateModelForm } from "./CreateModelForm";

export type ModelHubCreatePageMainViewProps = GeneralPageProp;

export const ModelHubCreatePageMainView = (
  props: ModelHubCreatePageMainViewProps
) => {
  const { accessToken, enableQuery, router } = props;

  return (
    <div className="flex flex-col">
      <PageTitle
        title="Set Up New Model"
        breadcrumbs={["Models", "Model Settings"]}
        className="mb-10"
      />
      <CreateModelForm
        width="w-full"
        onCreate={(initStore) => {
          initStore();
          router.push("/model-hub");
        }}
        accessToken={accessToken}
        enabledQuery={enableQuery}
        disabledCreateModel={true}
      />
    </div>
  );
};
