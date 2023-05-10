import { Root } from "@/components/Root";
import {
  ConfigureProfileForm,
  CreateModelWithPresetForm,
  useUser,
} from "@instill-ai/toolkit";
import { access } from "fs";

const ConfigureUserPage = () => {
  const user = useUser({ accessToken: null, enabled: true });

  return (
    <Root>
      <div className="w-[1200px]">
        <ConfigureProfileForm
          roles={[
            {
              label: "Manager",
              value: "manager",
            },
            {
              label: "AI Researcher",
              value: "ai-researcher",
            },
            {
              label: "AI Engineer",
              value: "ai-engineer",
            },
            {
              label: "Data Engineer",
              value: "data-engineer",
            },
            {
              label: "Data Scientist",
              value: "data-scientist",
            },
            {
              label: "Analytics Engineer",
              value: "analytics-engineer",
            },
            {
              label: "Hobbyist",
              value: "hobbyist",
            },
          ]}
          user={user.isSuccess ? user.data : null}
          accessToken={null}
          onConfigure={() => {}}
        />
      </div>
    </Root>
  );
};

export default ConfigureUserPage;
