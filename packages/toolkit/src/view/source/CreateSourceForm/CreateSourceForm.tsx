import * as React from "react";
import {
  FormRoot,
  SingleSelectOption,
  GrpcIcon,
  HttpIcon,
} from "@instill-ai/design-system";

import { Nullable, SourceWithDefinition } from "../../../lib";
import { CreateSourceControl } from "./CreateSourceControl";
import { SourceDefinitionField } from "./SourceDefinitionField";

export type CreateSourceFormProps = {
  sources: Nullable<SourceWithDefinition[]>;
  marginBottom: Nullable<string>;
  width: Nullable<string>;
  onCreate: Nullable<() => void>;
  accessToken: Nullable<string>;
  initStoreOnCreate: boolean;
};

export const CreateSourceForm = ({
  sources,
  marginBottom,
  width,
  onCreate,
  accessToken,
  initStoreOnCreate,
}: CreateSourceFormProps) => {
  const [sourceDefinitionOptions, setSourceDefinitionOptions] = React.useState<
    SingleSelectOption[]
  >([]);

  React.useEffect(() => {
    if (!sources) return;

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
  }, [sources]);

  return (
    <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
      <div className="flex flex-col gap-y-6">
        <SourceDefinitionField
          sourceDefinitionOptions={sourceDefinitionOptions}
        />
        <CreateSourceControl
          sources={sources}
          onCreate={onCreate}
          accessToken={accessToken}
          initStoreOnCreate={initStoreOnCreate}
        />
      </div>
    </FormRoot>
  );
};
