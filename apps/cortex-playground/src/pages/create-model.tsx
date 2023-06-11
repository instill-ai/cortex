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
          accessToken={null}
          disabledCreateModel={true}
          enabledQuery={true}
        />
      </div>
    </Root>
  );
};

export default CreateModelPage;
