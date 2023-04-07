import { Root } from "@/components/Root";
import { CreateModelForm } from "@instill-ai/toolkit";

const CreateModelPage = () => {
  return (
    <Root>
      <div className="w-[1200px]">
        <CreateModelForm
          onCreate={null}
          initStoreOnCreate={false}
          accessToken={null}
          marginBottom={null}
          width={null}
        />
      </div>
    </Root>
  );
};

export default CreateModelPage;
