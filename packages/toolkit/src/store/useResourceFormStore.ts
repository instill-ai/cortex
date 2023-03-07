import { PipelineMode } from "../vdp-sdk";
import { Nullable } from "../type";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type resourceType = Nullable<"new" | "existing">;

// We haven't had a good way to guarantee the correctness of formIsDirty
// Right now it just counts on whether the form had been changed from null
// to some value, it won't return to formIsDirty: false even the user
// rollback to previous value.

export type CreateResourceFormState = {
  formIsDirty: boolean;
  createNewResourceIsComplete: boolean;
  source: {
    type: resourceType;
    existing: {
      id: Nullable<string>;
      definition: Nullable<string>;
    };
    new: {
      id: Nullable<string>;
      definition: Nullable<string>;
    };
  };
  destination: {
    type: resourceType;
    existing: {
      id: Nullable<string>;
      definition: Nullable<string>;
    };
    new: {
      id: Nullable<string>;
      definition: Nullable<string>;
    };
  };
  model: {
    type: resourceType;
    existing: {
      id: Nullable<string>;
      instanceTag: Nullable<string>;
      definition: Nullable<string>;
    };
    new: {
      id: Nullable<string>;
      definition: Nullable<string>;
      instanceTag: Nullable<string>;
      description: Nullable<string>;
      local: {
        file: Nullable<File>;
      };
      github: { repoUrl: Nullable<string> };
      artivc: {
        gcsBucketPath: Nullable<string>;
        credentials: Nullable<string>;
      };
      huggingFace: { repoUrl: Nullable<string> };
      modelIsSet: boolean;
    };
  };
  pipeline: {
    id: Nullable<string>;
    mode: Nullable<PipelineMode>;
    description: Nullable<string>;
  };
  pipelineFormStep: number;
  error: {
    source: {
      existing: {
        id: Nullable<string>;
        definition: Nullable<string>;
      };
      new: {
        id: Nullable<string>;
        definition: Nullable<string>;
      };
    };
    destination: {
      existing: {
        id: Nullable<string>;
        definition: Nullable<string>;
      };
      new: {
        id: Nullable<string>;
        definition: Nullable<string>;
      };
    };
    model: {
      existing: {
        id: Nullable<string>;
        instanceTag: Nullable<string>;
        definition: Nullable<string>;
      };
      new: {
        id: Nullable<string>;
        definition: Nullable<string>;
        instanceTag: Nullable<string>;
        description: Nullable<string>;
        local: {
          file: Nullable<string>;
        };
        github: { repoUrl: Nullable<string> };
        artivc: {
          gcsBucketPath: Nullable<string>;
          credentials: Nullable<string>;
        };
        huggingFace: { repoUrl: Nullable<string> };
      };
    };
    pipeline: {
      id: Nullable<string>;
      mode: Nullable<string>;
      description: Nullable<string>;
    };
  };
};

export type CreateResourceFormAction = {
  initResourceFormStore: () => void;
  setSourceType: (type: resourceType) => void;
  setExistingSourceId: (id: Nullable<string>) => void;
  setExistingSourceError: (error: Nullable<string>) => void;
  setExistingSourceDefinition: (definition: Nullable<string>) => void;
  setExistingSourceDefinitionError: (error: Nullable<string>) => void;
  setNewSourceId: (id: Nullable<string>) => void;
  setNewSourceIdError: (error: Nullable<string>) => void;
  setNewSourceDefinition: (definition: Nullable<string>) => void;
  setNewSourceDefinitionError: (error: Nullable<string>) => void;
  setDestinationType: (type: resourceType) => void;
  setExistingDestinationId: (id: Nullable<string>) => void;
  setExistingDestinationIdError: (error: Nullable<string>) => void;
  setExistingDestinationDefinition: (definition: Nullable<string>) => void;
  setExistingDestinationDefinitionError: (error: Nullable<string>) => void;
  setNewDestinationId: (id: Nullable<string>) => void;
  setNewDestinationIdError: (error: Nullable<string>) => void;
  setNewDestinationDefinition: (definition: Nullable<string>) => void;
  setNewDestinationDefinitionError: (error: Nullable<string>) => void;
  setModelType: (type: resourceType) => void;
  setExistingModelId: (id: Nullable<string>) => void;
  setExistingModelIdError: (error: Nullable<string>) => void;
  setExistingModelInstanceTag: (modelInstanceTag: Nullable<string>) => void;
  setExistingModelInstanceTagError: (error: Nullable<string>) => void;
  setExistingModelDefinition: (definition: Nullable<string>) => void;
  setExistingModelDefinitionError: (error: Nullable<string>) => void;
  setNewModelIsSet: (isSet: boolean) => void;
  setNewModelId: (id: Nullable<string>) => void;
  setNewModelIdError: (error: Nullable<string>) => void;
  setNewModelDefinition: (definition: Nullable<string>) => void;
  setNewModelDefinitionError: (error: Nullable<string>) => void;
  setNewModelInstanceTag: (instanceTag: Nullable<string>) => void;
  setNewModelInstanceTagError: (error: Nullable<string>) => void;
  setNewModelDescription: (description: Nullable<string>) => void;
  setNewModelDescriptionError: (error: Nullable<string>) => void;
  setNewLocalModelFile: (file: Nullable<File>) => void;
  setNewLocalModelFileError: (error: Nullable<string>) => void;
  setNewGithubModelRepoUrl: (repoUrl: Nullable<string>) => void;
  setNewGithubModelRepoUrlError: (error: Nullable<string>) => void;
  setNewArtivcModelGcsBucketPath: (gcsBucketPath: Nullable<string>) => void;
  setNewArtivcModelGcsBucketPathError: (
    gcsBucketPath: Nullable<string>
  ) => void;
  setNewArtivcModelCredentials: (credentials: Nullable<string>) => void;
  setNewArtivcModelCredentialsError: (error: Nullable<string>) => void;
  setNewHuggingFaceModelRepoUrl: (huggingFaceRepoUrl: Nullable<string>) => void;
  setNewHuggingFaceModelRepoUrlError: (error: Nullable<string>) => void;
  setPipelineId: (id: Nullable<string>) => void;
  setPipelineIdError: (error: Nullable<string>) => void;
  setPipelineMode: (mode: Nullable<PipelineMode>) => void;
  setPipelineModeError: (error: Nullable<string>) => void;
  setPipelineDescription: (description: Nullable<string>) => void;
  setPipelineDescriptionError: (error: Nullable<string>) => void;
  increasePipelineFormStep: () => void;
  decreasePipelineFormStep: () => void;
  resetPipelineFormStep: () => void;
  setPipelineFormStep: (step: number) => void;
  setFormIsDirty: (isDirty: boolean) => void;
  setCreateNewResourceIsComplete: (isComplete: boolean) => void;
};

const createResourceInitialState: CreateResourceFormState = {
  formIsDirty: false,
  createNewResourceIsComplete: false,
  source: {
    type: null,
    new: {
      id: null,
      definition: null,
    },
    existing: {
      id: null,
      definition: null,
    },
  },
  destination: {
    type: null,
    new: {
      id: null,
      definition: null,
    },
    existing: {
      id: null,
      definition: null,
    },
  },
  model: {
    type: null,
    new: {
      id: null,
      definition: null,
      instanceTag: null,
      description: null,
      local: {
        file: null,
      },
      github: { repoUrl: null },
      artivc: {
        gcsBucketPath: null,
        credentials: null,
      },
      huggingFace: { repoUrl: null },
      modelIsSet: false,
    },
    existing: {
      id: null,
      definition: null,
      instanceTag: null,
    },
  },
  pipeline: {
    id: null,
    mode: "MODE_SYNC",
    description: null,
  },
  pipelineFormStep: 0,
  error: {
    source: {
      new: {
        id: null,
        definition: null,
      },
      existing: {
        id: null,
        definition: null,
      },
    },
    destination: {
      new: {
        id: null,
        definition: null,
      },
      existing: {
        id: null,
        definition: null,
      },
    },
    model: {
      new: {
        id: null,
        definition: null,
        instanceTag: null,
        description: null,
        local: {
          file: null,
        },
        github: { repoUrl: null },
        artivc: {
          gcsBucketPath: null,
          credentials: null,
        },
        huggingFace: { repoUrl: null },
      },
      existing: {
        id: null,
        definition: null,
        instanceTag: null,
      },
    },
    pipeline: {
      id: null,
      mode: "",
      description: null,
    },
  },
};

export const useResourceFormStore = create<
  CreateResourceFormState & CreateResourceFormAction
>()(
  immer(
    subscribeWithSelector(
      devtools((set) => ({
        ...createResourceInitialState,
        initResourceFormStore: () => set(createResourceInitialState),
        setSourceType: (type: resourceType) =>
          set((state) => {
            state.source.type = type;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setExistingSourceId: (id: Nullable<string>) =>
          set((state) => {
            state.source.existing.id = id;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setExistingSourceError: (error: Nullable<string>) =>
          set((state) => {
            state.error.source.existing.id = error;
          }),
        setExistingSourceDefinition: (definition: Nullable<string>) =>
          set((state) => {
            state.source.existing.definition = definition;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setExistingSourceDefinitionError: (error: Nullable<string>) =>
          set((state) => {
            state.error.source.existing.definition = error;
          }),
        setNewSourceId: (id: Nullable<string>) =>
          set((state) => {
            state.source.new.id = id;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewSourceIdError: (error: Nullable<string>) =>
          set((state) => {
            state.error.source.new.id = error;
          }),
        setNewSourceDefinition: (definition: Nullable<string>) =>
          set((state) => {
            state.source.new.definition = definition;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewSourceDefinitionError: (error: Nullable<string>) =>
          set((state) => {
            state.error.source.new.definition = error;
          }),
        setDestinationType: (type: resourceType) =>
          set((state) => {
            state.destination.type = type;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setExistingDestinationId: (id: Nullable<string>) =>
          set((state) => {
            state.destination.existing.id = id;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setExistingDestinationIdError: (error: Nullable<string>) =>
          set((state) => {
            state.error.destination.existing.id = error;
          }),
        setExistingDestinationDefinition: (definition: Nullable<string>) =>
          set((state) => {
            state.destination.existing.definition = definition;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setExistingDestinationDefinitionError: (error: Nullable<string>) =>
          set((state) => {
            state.error.destination.existing.definition = error;
          }),
        setNewDestinationId: (id: Nullable<string>) =>
          set((state) => {
            state.destination.new.id = id;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewDestinationIdError: (error: Nullable<string>) =>
          set((state) => {
            state.error.destination.new.id = error;
          }),
        setNewDestinationDefinition: (definition: Nullable<string>) =>
          set((state) => {
            state.destination.new.definition = definition;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewDestinationDefinitionError: (error: Nullable<string>) =>
          set((state) => {
            state.error.destination.new.definition = error;
          }),
        setModelType: (type: resourceType) =>
          set((state) => {
            state.model.type = type;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setExistingModelId: (id: Nullable<string>) =>
          set((state) => {
            state.model.existing.id = id;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setExistingModelIdError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.existing.id = error;
          }),
        setExistingModelInstanceTag: (modelInstanceTag: Nullable<string>) =>
          set((state) => {
            state.model.existing.instanceTag = modelInstanceTag;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setExistingModelInstanceTagError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.existing.instanceTag = error;
          }),
        setExistingModelDefinition: (definition: Nullable<string>) =>
          set((state) => {
            state.model.existing.definition = definition;
          }),
        setExistingModelDefinitionError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.existing.definition = error;
          }),
        setNewModelIsSet: (isSet: boolean) =>
          set((state) => {
            state.model.new.modelIsSet = isSet;
          }),
        setNewModelId: (id: Nullable<string>) =>
          set((state) => {
            state.model.new.id = id;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewModelIdError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.new.id = error;
          }),
        setNewModelDefinition: (definition: Nullable<string>) =>
          set((state) => {
            state.model.new.definition = definition;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewModelDefinitionError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.new.definition = error;
          }),
        setNewModelInstanceTag: (modelInstanceTag: Nullable<string>) =>
          set((state) => {
            state.model.new.instanceTag = modelInstanceTag;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewModelInstanceTagError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.new.instanceTag = error;
          }),
        setNewModelDescription: (description: Nullable<string>) =>
          set((state) => {
            state.model.new.description = description;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewModelDescriptionError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.new.description = error;
          }),
        setNewLocalModelFile: (file: Nullable<File>) =>
          set((state) => {
            state.model.new.local.file = file;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewLocalModelFileError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.new.local.file = error;
          }),
        setNewGithubModelRepoUrl: (githubRepoUrl: Nullable<string>) =>
          set((state) => {
            state.model.new.github.repoUrl = githubRepoUrl;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewGithubModelRepoUrlError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.new.github.repoUrl = error;
          }),
        setNewArtivcModelGcsBucketPath: (gcsBucketPath: Nullable<string>) =>
          set((state) => {
            state.model.new.artivc.gcsBucketPath = gcsBucketPath;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewArtivcModelGcsBucketPathError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.new.artivc.gcsBucketPath = error;
          }),
        setNewArtivcModelCredentials: (credentials: Nullable<string>) =>
          set((state) => {
            state.model.new.artivc.credentials = credentials;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewArtivcModelCredentialsError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.new.artivc.credentials = error;
          }),
        setNewHuggingFaceModelRepoUrl: (huggingFaceRepoUrl: Nullable<string>) =>
          set((state) => {
            state.model.new.huggingFace.repoUrl = huggingFaceRepoUrl;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setNewHuggingFaceModelRepoUrlError: (error: Nullable<string>) =>
          set((state) => {
            state.error.model.new.huggingFace.repoUrl = error;
          }),
        setPipelineId: (id: Nullable<string>) =>
          set((state) => {
            state.pipeline.id = id;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setPipelineIdError: (error: Nullable<string>) =>
          set((state) => {
            state.error.pipeline.id = error;
          }),
        setPipelineMode: (mode: Nullable<PipelineMode>) =>
          set((state) => {
            state.pipeline.mode = mode;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setPipelineModeError: (error: Nullable<string>) =>
          set((state) => {
            state.error.pipeline.mode = error;
          }),
        setPipelineDescription: (description: Nullable<string>) =>
          set((state) => {
            state.pipeline.description = description;
            if (!state.formIsDirty) state.formIsDirty = true;
          }),
        setPipelineDescriptionError: (error: Nullable<string>) =>
          set((state) => {
            state.error.pipeline.description = error;
          }),
        increasePipelineFormStep: () =>
          set((state) => {
            state.pipelineFormStep = state.pipelineFormStep + 1;
          }),
        decreasePipelineFormStep: () =>
          set((state) => {
            state.pipelineFormStep = state.pipelineFormStep - 1;
          }),
        resetPipelineFormStep: () =>
          set((state) => {
            state.pipelineFormStep = 0;
          }),
        setPipelineFormStep: (step: number) =>
          set((state) => {
            state.pipelineFormStep = step;
          }),
        setFormIsDirty: (isDirty: boolean) =>
          set((state) => {
            state.formIsDirty = isDirty;
          }),
        setCreateNewResourceIsComplete: (isComplete: boolean) =>
          set((state) => {
            state.createNewResourceIsComplete = isComplete;
          }),
      }))
    )
  )
);
