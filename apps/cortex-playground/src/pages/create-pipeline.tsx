import { Root } from "@/components/Root";
import { CreatePipelineForm } from "@instill-ai/toolkit";

const CreatePipelinePage = () => {
  return (
    <Root>
      <div className="w-[1200px]">
        <CreatePipelineForm
          onCreate={(init) => init()}
          accessToken={null}
          syncModelOnly={false}
          withModelPreset={false}
          enabledQuery={true}
          disabledCreateModel={true}
        />
      </div>
    </Root>
  );
};

export default CreatePipelinePage;
