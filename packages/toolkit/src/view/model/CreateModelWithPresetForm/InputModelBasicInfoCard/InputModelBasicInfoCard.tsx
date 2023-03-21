import { ModelIdField } from "./ModelIdField";
import { ModelDescriptionField } from "./ModelDescriptionField";
import { ModelBasicInputControl } from "./ModelBasicInputControl";
import { CardBase } from "../CardBase";
import { Nullable } from "../../../../lib";

export type InputModelBasicInfoCardProps = {
  marginBottom: Nullable<string>;
};

export const InputModelBasicInfoCard = ({
  marginBottom,
}: InputModelBasicInfoCardProps) => {
  return (
    <CardBase
      title="Fill out selected model information"
      marginBottom={marginBottom}
    >
      <div className="flex h-full w-full flex-col gap-y-6 p-6">
        <ModelIdField />
        <ModelDescriptionField />
        <ModelBasicInputControl />
      </div>
    </CardBase>
  );
};
