import React, { FormEvent } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicUploadFileField from "./BasicUploadFileField";

export default {
  title: "Components/Ui/Input/BasicUploadFileField",
  component: BasicUploadFileField,
} as ComponentMeta<typeof BasicUploadFileField>;

const Template: ComponentStory<typeof BasicUploadFileField> = (args) => (
  <BasicUploadFileField {...args} />
);
export const Playground: ComponentStory<typeof BasicUploadFileField> =
  Template.bind({});

Playground.args = {
  error: "",
  disabled: false,
  readOnly: false,
  required: true,
  onChangeInput: () => undefined,
  id: "upload-file-field-base-playground",
  label: "upload-file-field-base-playground",
  placeholder: "Upload a file",
  uploadButtonText: "Upload",
  description: "this is a description about upload file field",
};

export const DemoFileReader: ComponentStory<
  typeof BasicUploadFileField
> = () => {
  const onChangeInput = (inputValue) => {
    if (!inputValue) return;

    const reader = new FileReader();

    reader.readAsDataURL(inputValue);

    reader.onloadend = () => {
      console.log(reader.result);
    };
  };

  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <form
      onSubmit={(event) => onSubmitHandler(event)}
      //encType="multipart/form-data"
    >
      <BasicUploadFileField
        error={null}
        description="this is a description about upload file field"
        disabled={false}
        readOnly={false}
        onChangeInput={onChangeInput}
        required={true}
        id="upload-file-field-base-playground"
        label="upload-file-field-base-playground"
        placeholder="Upload a file"
        uploadButtonText="Upload"
      />
    </form>
  );
};
