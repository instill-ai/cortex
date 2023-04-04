import { useState } from "react";
import {
  BasicProgressMessageBox,
  FormRoot,
  ProgressMessageBoxState,
} from "@instill-ai/design-system";
import { Nullable, useCreateResourceFormStore } from "../../../lib";

import { SelectModelPresetCard } from "./SelectModelPresetCard";
import { InputModelBasicInfoCard } from "./InputModelBasicInfoCard";

export type CreateModelWithPresetFormProps = {
  onCreate: Nullable<() => void>;
  initStoreOnCreate: boolean;
  width: string;
  marginBottom: Nullable<string>;
  accessToken: Nullable<string>;
};

export const CreateModelWithPresetForm = ({
  onCreate,
  initStoreOnCreate,
  marginBottom,
  width,
  accessToken,
}: CreateModelWithPresetFormProps) => {
  return (
    <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
      <div className="flex flex-col">
        <SelectModelPresetCard marginBottom="mb-10" />
        <InputModelBasicInfoCard
          marginBottom={null}
          accessToken={accessToken}
          onCreate={onCreate}
          initStoreOnCreate={initStoreOnCreate}
        />
      </div>
    </FormRoot>
  );
};
