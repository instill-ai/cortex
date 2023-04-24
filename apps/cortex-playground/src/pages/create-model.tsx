import { Root } from "@/components/Root";
import {
  CreateModelForm,
  CreateModelWithPresetForm,
} from "@instill-ai/toolkit";

const CreateModelPage = () => {
  return (
    <Root>
      <div className="w-[1200px]">
        <CreateModelWithPresetForm
          onCreate={null}
          initStoreOnCreate={false}
          accessToken={null}
          marginBottom={null}
          disabledCreateModel={true}
        />
      </div>
    </Root>
  );
};

export default CreateModelPage;
