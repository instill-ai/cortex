import { BasicProgressMessageBox } from "@instill-ai/design-system";
import { MessageBoxStore, useMessageBoxStore } from "@instill-ai/toolkit";
import { shallow } from "zustand/shallow";

const selector = (state: MessageBoxStore) => ({
  status: state.status,
  message: state.message,
  description: state.description,
  activate: state.activate,
  setStateValue: state.setStateValue,
});

export const ConfigurePipelineMessageBox = () => {
  const { status, message, description, activate, setStateValue } =
    useMessageBoxStore(selector, shallow);

  return (
    <div className="flex">
      <BasicProgressMessageBox
        state={{ status, message, description, activate }}
        setActivate={(activate) => setStateValue("activate", activate)}
        width="w-[25vw]"
        closable={true}
      />
    </div>
  );
};
