import { Dispatch, FC, Fragment, SetStateAction } from "react";
import {
  AirbyteFieldErrors,
  AirbyteFieldValues,
  AirbyteFormTree,
  SelectedItemMap,
} from "../../lib/airbytes";
import type { Nullable } from "../../lib";
import { useBuildAirbyteFields } from ".";

export type AirbyteDestinationFieldsProps = {
  fieldValues: Nullable<AirbyteFieldValues>;
  setFieldValues: Dispatch<SetStateAction<Nullable<AirbyteFieldValues>>>;
  fieldErrors: Nullable<AirbyteFieldErrors>;
  destinationFormTree: Nullable<AirbyteFormTree>;
  selectedConditionMap: Nullable<SelectedItemMap>;
  setSelectedConditionMap: Dispatch<SetStateAction<Nullable<SelectedItemMap>>>;
  disableAll: boolean;
  formIsDirty: boolean;
  setFormIsDirty: Dispatch<SetStateAction<boolean>>;
};

export const AirbyteDestinationFields: FC<AirbyteDestinationFieldsProps> = ({
  fieldValues,
  setFieldValues,
  fieldErrors,
  destinationFormTree,
  selectedConditionMap,
  setSelectedConditionMap,
  disableAll,
  formIsDirty,
  setFormIsDirty,
}) => {
  const fields = useBuildAirbyteFields(
    destinationFormTree,
    disableAll,
    fieldValues,
    setFieldValues,
    fieldErrors,
    selectedConditionMap,
    setSelectedConditionMap,
    formIsDirty,
    setFormIsDirty
  );

  return <Fragment>{fields}</Fragment>;
};
