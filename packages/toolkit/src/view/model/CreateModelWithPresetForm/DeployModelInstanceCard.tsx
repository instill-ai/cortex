import cn from "clsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { shallow } from "zustand/shallow";
import {
  BasicProgressMessageBox,
  getModelDefinitionToolkit,
  ModelInstanceIcon,
  NoBgSquareProgress,
  ProgressMessageBoxState,
  SolidButton,
} from "@instill-ai/design-system";

import {
  useDeployModelInstance,
  useModel,
  useModelWithInstances,
  getInstillApiErrorMessage,
  useCreateResourceFormStore,
  type Nullable,
  CreateResourceFormStore,
} from "../../../lib";
import { CardBase } from "./CardBase";

export type DeployModelInstanceCardProps = {
  onSuccessfulComplete: () => void;
};

const selector = (state: CreateResourceFormStore) => ({
  modelId: state.fields.model.new.id,
  setCreateNewResourceIsComplete: state.setCreateNewResourceIsComplete,
  setFieldValue: state.setFieldValue,
});

export const DeployModelInstanceCard = ({
  onSuccessfulComplete,
}: DeployModelInstanceCardProps) => {
  /* -------------------------------------------------------------------------
   * Initialize form state
   * -----------------------------------------------------------------------*/

  const { modelId, setCreateNewResourceIsComplete, setFieldValue } =
    useCreateResourceFormStore(selector, shallow);

  const modelName = modelId ? `models/${modelId}` : null;
  const [selectedModelInstanceTag, setSelectedModelInstanceTag] =
    useState<Nullable<string>>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  /* -------------------------------------------------------------------------
   * Query model instances
   * -----------------------------------------------------------------------*/

  const model = useModel({ modelName, accessToken: null });
  const modelInstances = useModelWithInstances({
    model: model.isSuccess ? model.data : null,
    accessToken: null,
  });

  useEffect(() => {
    if (!modelInstances.isSuccess || !modelInstances.data) return;
    setSelectedModelInstanceTag(modelInstances.data.instances[0].id);
  }, [modelInstances.isSuccess, modelInstances.data]);

  /* -------------------------------------------------------------------------
   * Deploy model instances
   * -----------------------------------------------------------------------*/

  const deployModelInstance = useDeployModelInstance();

  const [
    deployModelInstanceMessageBoxState,
    setDeployModelInstanceMessageBoxState,
  ] = useState<ProgressMessageBoxState>({
    activate: false,
    message: null,
    description: null,
    status: null,
  });

  const handleDeployModelInstance = async () => {
    if (!selectedModelInstanceTag || !modelId) return;

    setIsDeploying(true);

    deployModelInstance.mutate(
      {
        modelInstanceName: `models/${modelId}/instances/${selectedModelInstanceTag}`,
        accessToken: null,
      },
      {
        onSuccess: () => {
          setDeployModelInstanceMessageBoxState(() => ({
            activate: true,
            status: "success",
            description: null,
            message: "Succeed.",
          }));
          setFieldValue("model.new.instanceTag", selectedModelInstanceTag);
          setCreateNewResourceIsComplete(true);
          onSuccessfulComplete();
        },
        onError: (error) => {
          setIsDeploying(false);
          if (axios.isAxiosError(error)) {
            setDeployModelInstanceMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: getInstillApiErrorMessage(error),
              message: "Something went wrong when deploy the model instance",
            }));
          } else {
            console.log(error);
            setDeployModelInstanceMessageBoxState(() => ({
              activate: true,
              status: "error",
              description: null,
              message: "Something went wrong when deploy the model instance",
            }));
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-6">
      <CardBase title={null} marginBottom={null}>
        <div className="flex h-full w-full flex-col">
          <div className="mb-5 flex flex-col px-6 pt-6">
            <h2 className="text-instillGrey95 text-instill-h2">
              Model Instances
            </h2>
            <p className="text-instillGrey50 text-instill-body">
              These are the model instances you can select from the model
            </p>
          </div>
          {modelInstances.isSuccess && modelInstances.data ? (
            <table className="table-auto border-collapse">
              <thead>
                <tr className="h-[44px] border-y border-[#EAECF0] bg-[#F9FAFB]">
                  <th>
                    <p className="px-6 text-left text-sm font-medium">
                      Model ID
                    </p>
                  </th>
                  <th>
                    <p className="px-6 text-left text-sm font-medium">Source</p>
                  </th>
                  <th>
                    <p className="px-6 text-left text-sm font-medium">
                      Instance
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {modelInstances.data.instances.map((e) => {
                  const definitionToolkit = getModelDefinitionToolkit(
                    e.model_definition
                  );
                  return (
                    <>
                      <tr
                        onClick={() => {
                          if (isDeploying) return;
                          setSelectedModelInstanceTag(e.id);
                        }}
                        className={cn(
                          "h-[72px] cursor-pointer border-y border-[#EAECF0]",
                          isDeploying ? "" : "hover:bg-instillGrey05"
                        )}
                      >
                        <td className="border-1 border-[#EAECF0]">
                          <div className="flex flex-row gap-x-3 px-6">
                            <div className="flex h-5 w-5 rounded-full border border-instillGrey20">
                              <div
                                className={cn(
                                  "m-auto h-2 w-2 rounded-full",
                                  selectedModelInstanceTag === e.id
                                    ? "bg-instillBlue50"
                                    : ""
                                )}
                              ></div>
                            </div>
                            <div className="my-auto flex flex-col gap-y-1">
                              <h4>{model.data?.id}</h4>
                              <p>{model.data?.description}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-row gap-x-2.5 px-6">
                            {definitionToolkit.getIcon({
                              width: "w-5",
                              height: "h-5",
                              color: "fill-instillGrey90",
                              position: "my-auto",
                            })}
                            <p className="text-instillGrey90 text-instill-body">
                              {definitionToolkit.title}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-row gap-x-2 px-6">
                            <ModelInstanceIcon
                              width="w-5"
                              height="h-5"
                              color="fill-instillGrey90"
                              position="my-auto"
                            />
                            <p className="text-instillGrey90 text-instill-body">
                              {e.id}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </div>
        <div className="flex px-6 py-4">
          <div className="ml-auto flex flex-row gap-x-2">
            {isDeploying ? (
              <NoBgSquareProgress blockSize={38} isLoading={true} />
            ) : null}
            <SolidButton
              disabled={modelId ? false : true}
              onClickHandler={() => {
                handleDeployModelInstance();
              }}
              position="ml-auto mb-auto"
              type="button"
              color="primary"
            >
              <p className="text-instill-bold-body">Deploy</p>
            </SolidButton>
          </div>
        </div>
      </CardBase>
      <div className="ml-auto">
        <BasicProgressMessageBox
          state={deployModelInstanceMessageBoxState}
          setActivate={(activate) =>
            setDeployModelInstanceMessageBoxState((prev) => ({
              ...prev,
              activate,
            }))
          }
          width="w-[25vw]"
          closable={true}
        />
      </div>
    </div>
  );
};
