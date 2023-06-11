import cn from "clsx";
import { FormRoot, FormRootProps } from "@instill-ai/design-system";
import type { Nullable } from "../../../lib";

import { SelectModelPresetCard } from "./SelectModelPresetCard";
import { InputModelBasicInfoCard } from "./InputModelBasicInfoCard";

export type CreateModelWithPresetFormProps = {
  onCreate: Nullable<() => void>;
  accessToken: Nullable<string>;
  disabledCreateModel?: boolean;
} & Pick<FormRootProps, "marginBottom" | "width">;

export const CreateModelWithPresetForm = ({
  onCreate,
  marginBottom,
  width,
  accessToken,
  disabledCreateModel,
}: CreateModelWithPresetFormProps) => {
  return disabledCreateModel ? (
    <div className={cn("flex-1 h-full", width || "w-full")}>
      <p className="font-normal text-sm font-sans m-auto w-2/3 text-center">
        Model creation is currently disabled, Please use our pre-deployed models
      </p>
    </div>
  ) : (
    <FormRoot
      marginBottom={marginBottom}
      formLess={false}
      width={width || "w-full"}
    >
      <div className="flex flex-col">
        <SelectModelPresetCard marginBottom="mb-10" />
        <InputModelBasicInfoCard
          accessToken={accessToken}
          onCreate={onCreate}
        />
      </div>
    </FormRoot>
  );
};
