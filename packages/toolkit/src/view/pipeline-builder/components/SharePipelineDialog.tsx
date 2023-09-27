import {
  Button,
  Dialog,
  Icons,
  Switch,
  Tooltip,
  useToast,
} from "@instill-ai/design-system";
import * as React from "react";
import {
  Nullable,
  UpdateUserPipelinePayload,
  getInstillApiErrorMessage,
  useUpdateUserPipeline,
  useUserPipeline,
} from "../../../lib";
import { useRouter } from "next/router";
import { isAxiosError } from "axios";

export type SharePipelineDialogProps = {
  accessToken: Nullable<string>;
  enableQuery: boolean;
};

export const SharePipelineDialog = (props: SharePipelineDialogProps) => {
  const { accessToken, enableQuery } = props;
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { id, entity } = router.query;

  const { toast } = useToast();

  const pipeline = useUserPipeline({
    pipelineName: `users/${entity}/pipelines/${id}`,
    accessToken,
    enabled: enableQuery,
  });

  const updatePipeline = useUpdateUserPipeline();

  const pipelineIsPublic = React.useMemo(() => {
    if (!pipeline.isSuccess) {
      return false;
    }

    const toplevelRule = pipeline.data.permission.users["users/*"];

    if (toplevelRule && toplevelRule.enabled) {
      return true;
    } else {
      return false;
    }
  }, [pipeline.data, pipeline.isSuccess]);

  return (
    <Dialog.Root open={open} onOpenChange={(open) => setOpen(open)}>
      <Dialog.Trigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          variant="primary"
          size="lg"
          disabled={!pipeline.isSuccess}
        >
          Share
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <div className="flex w-full h-full flex-col">
          <div className="px-6 py-3 flex border-b border-semantic-bg-line">
            <p className="my-auto product-button-button-2 text-semantic-accent-pressed">
              Share
            </p>
          </div>
          <div className="mb-3 flex flex-col px-6 py-3">
            <div className="flex flex-row gap-x-2">
              <p className="product-body-text-3-semibold">
                Make the Pipeline Public
              </p>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild={true}>
                    <Icons.HelpCircle className="w-4 h-4 stroke-semantic-fg-secondary" />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="!px-3 !py-2 rounded-sm !product-body-text-4-semibold bg-semantic-bg-primary">
                      A public pipeline can be viewed by any logged in user in
                      Instill Cloud, but it can not be edited or triggered.
                      <Tooltip.Arrow
                        className="fill-semantic-bg-primary"
                        offset={10}
                        width={18}
                        height={12}
                      />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
            <Switch
              checked={pipelineIsPublic}
              onCheckedChange={async (check) => {
                if (!pipeline.isSuccess) return;

                const payload: UpdateUserPipelinePayload = {
                  name: `users/${entity}/pipelines/${id}`,
                  permission: {
                    users: {
                      ...pipeline.data.permission.users,
                      "users/*": {
                        enabled: check,
                        role: "ROLE_VIEWER",
                      },
                    },
                    share_code: {
                      ...pipeline.data?.permission.share_code,
                    },
                  },
                };

                try {
                  updatePipeline.mutateAsync({
                    payload,
                    accessToken,
                  });
                } catch (error) {
                  if (isAxiosError(error)) {
                    toast({
                      title:
                        "Something went wrong when switch pipeline permission",
                      variant: "alert-error",
                      size: "large",
                      description: getInstillApiErrorMessage(error),
                    });
                  } else {
                    toast({
                      title:
                        "Something went wrong when switch pipeline permission",
                      variant: "alert-error",
                      size: "large",
                      description: "Please try again later",
                    });
                  }
                }
              }}
              disabled={!pipeline.isSuccess}
            />
          </div>
          {!pipelineIsPublic ? (
            <div className="mb-3 flex flex-col px-6 py-3">
              <div className="flex flex-row gap-x-2">
                <p className="product-body-text-3-semibold">Share by link</p>
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild={true}>
                      <Icons.HelpCircle className="w-4 h-4 stroke-semantic-fg-secondary" />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="!px-3 !py-2 rounded-sm !product-body-text-4-semibold bg-semantic-bg-primary">
                        Users with the link can view the pipeline, but they can
                        not edit or trigger the pipeline
                        <Tooltip.Arrow
                          className="fill-semantic-bg-primary"
                          offset={10}
                          width={18}
                          height={12}
                        />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
              <Switch
                checked={false}
                onCheckedChange={async (check) => {
                  if (!pipeline.isSuccess) return;

                  // const payload: UpdateUserPipelinePayload = {
                  //   name: `users/${entity}/pipelines/${id}`,
                  //   permission: {
                  //     users: {
                  //       ...pipeline.data.permission.users,
                  //       "users/*": {
                  //         enabled: check,
                  //         role: "ROLE_VIEWER",
                  //       },
                  //     },
                  //     share_code: {
                  //       ...pipeline.data?.permission.share_code,
                  //     },
                  //   },
                  // };

                  // try {
                  //   updatePipeline.mutateAsync({
                  //     payload,
                  //     accessToken,
                  //   });
                  // } catch (error) {
                  //   if (isAxiosError(error)) {
                  //     toast({
                  //       title:
                  //         "Something went wrong when switch pipeline permission",
                  //       variant: "alert-error",
                  //       size: "large",
                  //       description: getInstillApiErrorMessage(error),
                  //     });
                  //   } else {
                  //     toast({
                  //       title:
                  //         "Something went wrong when switch pipeline permission",
                  //       variant: "alert-error",
                  //       size: "large",
                  //       description: "Please try again later",
                  //     });
                  //   }
                  // }
                }}
                disabled={!pipeline.isSuccess}
              />
            </div>
          ) : null}
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-x-3">
              {pipelineIsPublic ? (
                <Icons.LockUnlocked03 className="w-6 h-6 stroke-semantic-fg-secondary" />
              ) : (
                <Icons.Lock03 className="w-6 h-6 stroke-semantic-fg-secondary" />
              )}
              <p className="product-button-button-3">
                {pipelineIsPublic
                  ? "Anyone can view this pipeline"
                  : "Anyone with the link"}
              </p>
            </div>
          </div>
        </div>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Root>
  );
};
