import {
  FormRoot,
  SingleSelectOption,
  GrpcIcon,
  HttpIcon,
} from "@instill-ai/design-system";
import { useEffect, useState } from "react";
import { Nullable, useSources } from "../../../lib";
import { CreateSourceControl } from "./CreateSourceControl";
import { SourceDefinitionField } from "./SourceDefinitionField";

export type CreateSourceFormProps = {
  marginBottom: Nullable<string>;
  width: string;
  accessToken: Nullable<string>;
  onSuccessfulComplete: Nullable<() => void>;
};

export const CreateSourceForm = ({
  marginBottom,
  width,
  accessToken,
  onSuccessfulComplete,
}: CreateSourceFormProps) => {
  const sources = useSources({ accessToken });

  const [sourceDefinitionOptions, setSourceDefinitionOptions] = useState<
    SingleSelectOption[]
  >([]);

  useEffect(() => {
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
    <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
      <div className="flex flex-col gap-y-6">
        <SourceDefinitionField
          sourceDefinitionOptions={sourceDefinitionOptions}
        />
        <CreateSourceControl
          sources={sources.isSuccess ? sources.data : null}
          onSuccessfulComplete={onSuccessfulComplete}
        />
      </div>
    </FormRoot>
  );
};
