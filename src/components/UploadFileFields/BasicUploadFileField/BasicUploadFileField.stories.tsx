import React, { FormEvent, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BasicUploadFileField from "./BasicUploadFileField";

export default {
  title: "Components/Base/Input/BasicUploadFileField",
  component: BasicUploadFileField,
} as ComponentMeta<typeof BasicUploadFileField>;

const Template: ComponentStory<typeof BasicUploadFileField> = (args) => (
  <BasicUploadFileField {...args} />
);
export const Playground: ComponentStory<typeof BasicUploadFileField> =
  Template.bind({});

export const Default: ComponentStory<typeof BasicUploadFileField> = () => {
  // const [file, setFile] = useState<string>("");

  const onChangeInput = (inputValue) => {
    console.log(inputValue);

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
        id="upload-file-field-base-playground"
        disabled={false}
        readOnly={false}
        onChangeInput={onChangeInput}
        required={true}
        labelName="upload-file-field-base-playground"
        placeholder="Upload a file"
        uploadButtonText="Upload"
      />
    </form>
  );
};
