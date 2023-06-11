import * as React from "react";
import {
  FormRoot,
  SingleSelectOption,
  GrpcIcon,
  HttpIcon,
  FormRootProps,
} from "@instill-ai/design-system";

import {
  CreateSourceControl,
  type CreateSourceControlProps,
} from "./CreateSourceControl";
import { SourceDefinitionField } from "./SourceDefinitionField";
import { useSources } from "../../../lib";

export type CreateSourceFormProps = Pick<
  FormRootProps,
  "marginBottom" | "width"
> &
  Pick<
    CreateSourceControlProps,
    "accessToken" | "onCreate" | "initStoreOnCreate"
  > & {
    enabledQuery: boolean;
  };

export const CreateSourceForm = (props: CreateSourceFormProps) => {
  const {
    marginBottom,
    width,
    onCreate,
    accessToken,
    initStoreOnCreate,
    enabledQuery,
  } = props;
  const [sourceDefinitionOptions, setSourceDefinitionOptions] = React.useState<
    SingleSelectOption[]
  >([]);

  const sources = useSources({
    accessToken,
    enabled: enabledQuery,
  });

  React.useEffect(() => {
    if (!sources.isSuccess) return;

    setSourceDefinitionOptions([
      {
        label: "gRPC",
        value: "source-grpc",
        startIcon: (
          <GrpcIcon
            color="fill-instillGrey90"
            height="h-[30px]"
            width="w-[30px]"
            position="my-auto"
          />
        ),
      },
      {
        label: "HTTP",
        value: "source-http",
        startIcon: (
          <HttpIcon
            color="fill-instillGrey90"
            height="h-[30px]"
            width="w-[30px]"
            position="my-auto"
          />
        ),
      },
    ]);
  }, [sources.isSuccess]);

  return (
    <FormRoot marginBottom={marginBottom} width={width}>
      <div className="flex flex-col gap-y-6">
        <SourceDefinitionField
          sourceDefinitionOptions={sourceDefinitionOptions}
        />
        <CreateSourceControl
          sources={sources.isSuccess ? sources.data : null}
          onCreate={onCreate}
          accessToken={accessToken}
          initStoreOnCreate={initStoreOnCreate}
        />
      </div>
    </FormRoot>
  );
};
