import { Root } from "@/components/Root";
import {
  CreateModelForm,
  CreateModelWithPresetForm,
} from "@instill-ai/toolkit";

const CreateModelPage = () => {
  return (
    <Root>
      <div className="w-[1200px]">
        <CreateModelForm
          onCreate={null}
          initStoreOnCreate={false}
          accessToken={null}
          disabledCreateModel={true}
        />
      </div>
    </Root>
  );
};

export default CreateModelPage;
