import { Root } from "@/components/Root";
import { CreateModelWithPresetForm } from "@instill-ai/toolkit";

const CreateModelWithPresetPage = () => {
  return (
    <Root>
      <div className="w-[1200px]">
        <CreateModelWithPresetForm
          onCreate={null}
          initStoreOnCreate={false}
          accessToken={null}
          width=""
        />
      </div>
    </Root>
  );
};

export default CreateModelWithPresetPage;
