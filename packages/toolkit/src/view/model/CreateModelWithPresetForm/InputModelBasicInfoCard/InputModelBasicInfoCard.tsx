import { ModelIdField } from "./ModelIdField";
import { ModelDescriptionField } from "./ModelDescriptionField";
import {
  ModelBasicInputControl,
  ModelBasicInputControlProps,
} from "./ModelBasicInputControl";
import { CardBase, CardBaseProps } from "../CardBase";
import { Nullable } from "../../../../lib";

export type InputModelBasicInfoCardProps = {
  accessToken: Nullable<string>;
  onCreate: ModelBasicInputControlProps["onCreate"];
} & Pick<CardBaseProps, "marginBottom">;

export const InputModelBasicInfoCard = (
  props: InputModelBasicInfoCardProps
) => {
  const { accessToken, onCreate, marginBottom } = props;
  return (
    <CardBase
      title="Fill out selected model information"
      marginBottom={marginBottom}
    >
      <div className="flex h-full w-full flex-col gap-y-6 p-6">
        <ModelIdField />
        <ModelDescriptionField />
        <ModelBasicInputControl accessToken={accessToken} onCreate={onCreate} />
      </div>
    </CardBase>
  );
};
