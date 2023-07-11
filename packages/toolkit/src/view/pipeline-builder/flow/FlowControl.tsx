import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";

import { Button, Icons, useToast } from "@instill-ai/design-system";
import {
  CreatePipelinePayload,
  Nullable,
  Pipeline,
  PipelineBuilderStore,
  UpdatePipelinePayload,
  getInstillApiErrorMessage,
  useActivatePipeline,
  useCreatePipeline,
  useDeActivatePipeline,
  usePipeline,
  usePipelineBuilderStore,
  useRenamePipeline,
  useUpdatePipeline,
  useWatchPipeline,
} from "../../../lib";
import { constructPipelineRecipe } from "../../../lib/pipeline-builder";
import { useState } from "react";

const pipelineBuilderSelector = (state: PipelineBuilderStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  pipelineId: state.pipelineId,
  pipelineDescription: state.pipelineDescription,
  setPipelineUid: state.setPipelineUid,
  pipelineRecipeIsDirty: state.pipelineRecipeIsDirty,
  updatePipelineRecipeIsDirty: state.updatePipelineRecipeIsDirty,
  updateEdges: state.updateEdges,
});

export type FlowControlProps = {
  accessToken: Nullable<string>;
  enableQuery: boolean;
};

/**
 * FlowControl is a component that handles the crucial action of pipeline like
 * - Save pipeline
 * - Activate pipeline
 * - Deactivate pipeline
 */

export const FlowControl = (props: FlowControlProps) => {
  const { accessToken, enableQuery } = props;
  const router = useRouter();
  const {
    nodes,
    pipelineId,
    pipelineDescription,
    setPipelineUid,
    edges,
    updateEdges,
    pipelineRecipeIsDirty,
    updatePipelineRecipeIsDirty,
  } = usePipelineBuilderStore(pipelineBuilderSelector, shallow);

  const { toast } = useToast();
  const { id } = router.query;

  const pipeline = usePipeline({
    pipelineName: `pipelines/${id}`,
    accessToken,
    enabled: !!id && enableQuery,
  });

  const pipelineWatchState = useWatchPipeline({
    pipelineName: `pipelines/${id}`,
    accessToken,
    enabled: !!id && enableQuery,
  });

  const updatePipeline = useUpdatePipeline();
  const createPipeline = useCreatePipeline();
  const activatePipeline = useActivatePipeline();
  const deactivatePipeline = useDeActivatePipeline();
  const renamePipeline = useRenamePipeline();

  const [isHandlingConnection, setIsHandlingConnection] = useState(false);

  async function handleTogglePipeline() {
    if (!pipeline.isSuccess || !pipelineWatchState.isSuccess) return;

    if (pipelineRecipeIsDirty) {
      await handleSavePipeline();
    }

    setIsHandlingConnection(true);

    if (
      pipelineWatchState.data.state === "STATE_ACTIVE" ||
      pipelineWatchState.data.state === "STATE_ERROR"
    ) {
      deactivatePipeline.mutate(
        {
          pipelineName: `pipelines/${pipelineId}`,
          accessToken,
        },
        {
          onSuccess: () => {
            toast({
              title: "Successfully deativated the pipeline",
              variant: "alert-success",
              size: "small",
            });
            setIsHandlingConnection(false);

            updateEdges((edges) => {
              return edges.map((edge) => ({
                ...edge,
                animated: false,
              }));
            });
          },
          onError: (error) => {
            setIsHandlingConnection(false);
            if (isAxiosError(error)) {
              toast({
                title: "Something went wrong when deactivated the pipeline",
                description: getInstillApiErrorMessage(error),
                variant: "alert-error",
                size: "large",
              });
            } else {
              toast({
                title: "Something went wrong when deactivated the pipeline",
                variant: "alert-error",
                size: "large",
              });
            }
          },
        }
      );
    } else {
      activatePipeline.mutate(
        {
          pipelineName: `pipelines/${pipelineId}`,
          accessToken,
        },
        {
          onSuccess: () => {
            toast({
              title: "Successfully activated the pipeline",
              variant: "alert-success",
              size: "small",
            });
            setIsHandlingConnection(false);

            updateEdges((edges) => {
              return edges.map((edge) => ({
                ...edge,
                animated: true,
              }));
            });
          },
          onError: (error) => {
            setIsHandlingConnection(false);
            if (isAxiosError(error)) {
              toast({
                title: "Something went wrong when activated the pipeline",
                description: getInstillApiErrorMessage(error),
                variant: "alert-error",
                size: "large",
              });
            } else {
              toast({
                title: "Something went wrong when activated the pipeline",
                variant: "alert-error",
                size: "large",
              });
            }
          },
        }
      );
    }
  }

  const [isSaving, setIsSaving] = useState(false);

  async function handleSavePipeline() {
    if (!pipelineId) {
      toast({
        title: "Pipeline ID not set",
        description:
          "The pipeline ID should be set before saving the pipeline.",
        variant: "alert-error",
        size: "large",
      });
      return;
    }

    setIsSaving(true);

    if (pipeline.isSuccess) {
      if (pipelineId !== pipeline.data.id) {
        try {
          await renamePipeline.mutateAsync({
            payload: {
              pipelineId: pipeline.data.id,
              newPipelineId: pipelineId,
            },
            accessToken,
          });

          router.push(`/pipelines/${pipelineId}`, undefined, {
            shallow: true,
          });
        } catch (error) {
          if (isAxiosError(error)) {
            toast({
              title: "Something went wrong when rename the pipeline",
              description: getInstillApiErrorMessage(error),
              variant: "alert-error",
              size: "large",
            });
          } else {
            toast({
              title: "Something went wrong when rename the pipeline",
              variant: "alert-error",
              description: "Please try again later",
              size: "large",
            });
          }
        }
      }

      const payload: UpdatePipelinePayload = {
        name: `pipelines/${pipelineId}`,
        description: pipelineDescription ?? undefined,
        recipe: constructPipelineRecipe(nodes, edges),
      };

      try {
        await updatePipeline.mutateAsync({
          payload,
          accessToken,
        });
        toast({
          title: "Pipeline is saved",
          variant: "alert-success",
          size: "small",
        });
        setIsSaving(false);
        updatePipelineRecipeIsDirty(() => false);
      } catch (error) {
        setIsSaving(false);
        if (isAxiosError(error)) {
          toast({
            title: "Something went wrong when save the pipeline",
            description: getInstillApiErrorMessage(error),
            variant: "alert-error",
            size: "large",
          });
        } else {
          toast({
            title: "Something went wrong when save the pipeline",
            variant: "alert-error",
            size: "large",
          });
        }
      }

      return;
    }

    const payload: CreatePipelinePayload = {
      id: pipelineId,
      recipe: constructPipelineRecipe(nodes, edges),
    };

    let newPipeline: Nullable<Pipeline> = null;

    try {
      const res = await createPipeline.mutateAsync({
        payload,
        accessToken,
      });

      setPipelineUid(res.pipeline.uid);

      newPipeline = res.pipeline;

      router.push(`/pipelines/${pipelineId}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      setIsSaving(false);
      if (isAxiosError(error)) {
        toast({
          title: "Something went wrong when save the pipeline",
          description: getInstillApiErrorMessage(error),
          variant: "alert-error",
          size: "large",
        });
      } else {
        toast({
          title: "Something went wrong when save the pipeline",
          variant: "alert-error",
          size: "large",
        });
      }
    }

    if (!pipelineDescription) {
      toast({
        title: "Pipeline is saved",
        variant: "alert-success",
        size: "small",
      });
      setIsSaving(false);
      updatePipelineRecipeIsDirty(() => false);
      return;
    }

    if (!newPipeline) {
      toast({
        title: "Something went wrong when save the pipeline",
        description: "Please try again later",
        variant: "alert-error",
        size: "large",
      });
      return;
    }

    try {
      await updatePipeline.mutateAsync({
        payload: {
          name: newPipeline.name,
          description: pipelineDescription,
          recipe: {
            version: "v1alpha",
            components: [],
          },
        },
        accessToken,
      });

      toast({
        title: "Pipeline is saved",
        variant: "alert-success",
        size: "small",
      });
      setIsSaving(false);
      updatePipelineRecipeIsDirty(() => false);
    } catch (error) {
      setIsSaving(false);
      if (isAxiosError(error)) {
        toast({
          title: "Something went wrong when save the pipeline",
          description: getInstillApiErrorMessage(error),
          variant: "alert-error",
          size: "large",
        });
      } else {
        toast({
          title: "Something went wrong when save the pipeline",
          variant: "alert-error",
          size: "large",
        });
      }
    }
  }

  return (
    <div className="absolute bottom-4 right-4 flex flex-row-reverse gap-x-4">
      <Button
        onClick={handleTogglePipeline}
        className="gap-x-2"
        variant="primary"
        size="lg"
        disabled={
          pipeline.isSuccess && pipelineWatchState.isSuccess ? false : true
        }
      >
        {pipelineWatchState.isSuccess ? (
          pipelineWatchState.data.state === "STATE_ACTIVE" ||
          pipelineWatchState.data.state === "STATE_ERROR" ? (
            <>
              <span>Deactivate</span>
              {isHandlingConnection ? (
                <svg
                  className="m-auto h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <Icons.Stop className="h-4 w-4 fill-semantic-fg-on-default stroke-semantic-fg-on-default group-disabled:fill-semantic-fg-disabled group-disabled:stroke-semantic-fg-disabled" />
              )}
            </>
          ) : (
            <>
              <span>Activate</span>
              {isHandlingConnection ? (
                <svg
                  className="m-auto h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <Icons.Play className="h-4 w-4 fill-semantic-fg-on-default stroke-semantic-fg-on-default group-disabled:fill-semantic-fg-disabled group-disabled:stroke-semantic-fg-disabled" />
              )}
            </>
          )
        ) : (
          "Disabled"
        )}
      </Button>
      <Button
        onClick={handleSavePipeline}
        className="gap-x-2"
        variant="secondaryGrey"
        size="lg"
      >
        {pipeline.isSuccess ? (
          <>
            Save
            {isSaving ? (
              <svg
                className="m-auto h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <Icons.Save01 className="h-5 w-5 stroke-semantic-fg-primary" />
            )}
          </>
        ) : (
          "Create"
        )}
      </Button>
    </div>
  );
};
