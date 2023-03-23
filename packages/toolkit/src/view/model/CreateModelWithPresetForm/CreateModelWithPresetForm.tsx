import { useState } from "react";
import {
  BasicProgressMessageBox,
  FormRoot,
  ProgressMessageBoxState,
} from "@instill-ai/design-system";
import { Nullable, useCreateResourceFormStore } from "../../../lib";

import { CreateModelConfirmationModal } from "./CreateModelConfirmationModal";
import { SelectModelPresetCard } from "./SelectModelPresetCard";
import { InputModelBasicInfoCard } from "./InputModelBasicInfoCard";
import { DeployModelInstanceCard } from "./DeployModelInstanceCard";

export type CreateModelWithPresetFormProps = {
  onCreate: Nullable<() => void>;
  initStoreOnCreate: boolean;
  width: string;
  marginBottom: Nullable<string>;
};

export const CreateModelWithPresetForm = ({
  onCreate,
  initStoreOnCreate,
  marginBottom,
  width,
}: CreateModelWithPresetFormProps) => {
  const newModelIsSet = useCreateResourceFormStore(
    (state) => state.fields.model.new.modelIsSet
  );

  const [createModelMessageBoxState, setCreateModelMessageBoxState] =
    useState<ProgressMessageBoxState>({
      activate: false,
      message: null,
      description: null,
      status: null,
    });

  return (
    <FormRoot marginBottom={marginBottom} formLess={false} width={width}>
      {newModelIsSet ? (
        <>
          <DeployModelInstanceCard
            onCreate={onCreate}
            initStoreOnCreate={initStoreOnCreate}
          />
        </>
      ) : (
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col">
            <SelectModelPresetCard marginBottom="mb-10" />
            <InputModelBasicInfoCard marginBottom={null} />
            <CreateModelConfirmationModal
              setErrorMessageBoxState={setCreateModelMessageBoxState}
            />
          </div>
          <div className="mt-auto">
            {createModelMessageBoxState.status === "error" ? (
              <BasicProgressMessageBox
                state={createModelMessageBoxState}
                setActivate={(activate) =>
                  setCreateModelMessageBoxState((prev) => ({
                    ...prev,
                    activate,
                  }))
                }
                width="w-[25vw]"
                closable={true}
              />
            ) : null}
          </div>
        </div>
      )}
    </FormRoot>
  );
};
