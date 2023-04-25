import { Root } from "@/components/Root";
import {
  CreateModelForm,
  CreateModelWithPresetForm,
  useModelDefinition,
  useModelDefinitions,
} from "@instill-ai/toolkit";

const CreateModelPage = () => {
  const modelDefinitions = useModelDefinitions({
    accessToken: null,
    enabled: true,
  });

  return (
    <Root>
      <div className="w-[1200px]">
        <CreateModelForm
          onCreate={null}
          initStoreOnCreate={false}
          accessToken={null}
          disabledCreateModel={true}
          modelDefinitions={
            modelDefinitions.isSuccess ? modelDefinitions.data : null
          }
        />
      </div>
    </Root>
  );
};

export default CreateModelPage;
