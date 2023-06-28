export type PipelineMode = "MODE_UNSPECIFIED" | "MODE_SYNC" | "MODE_ASYNC";

export type PipelineState =
  | "STATE_UNSPECIFIED"
  | "STATE_ACTIVE"
  | "STATE_INACTIVE"
  | "STATE_ERROR";

export type PipelineRecipe = {
  version: string;
  components: (ModelComponent | SourceComponent | DestinationComponent)[];
};

export type PipelineWatchState = {
  state: PipelineState;
  progress: number;
};

export type PipelinesWatchState = Record<string, PipelineWatchState>;

export type SourceComponent = {
  id: string;
  resource_name: string;
  resource_detail: {
    connector: {
      create_time: string;
      description: string;
      state: string;
      update_time: string;
      user: string;
    };
    id: string;
    name: string;
    source_connector_definition: string;
    source_connector_definition_detail: PipelineConnectorComponentDefinition;
    uid: string;
  };
  metadata: any;
  dependencies: Record<string, any>;
};

export type DestinationComponent = {
  id: string;
  resource_name: string;
  resource_detail: {
    connector: {
      create_time: string;
      description: string;
      state: string;
      update_time: string;
      user: string;
    };
    destination_connector_definition: string;
    destination_connector_definition_detail: PipelineConnectorComponentDefinition;
    id: string;
    name: string;
    uid: string;
  };
  metadata: any;
  dependencies: Record<string, any>;
};

export type PipelineConnectorComponentDefinition = {
  connector_definition: {
    documentation_url: string;
    icon: string;
    public: boolean;
    title: string;
  };
  id: string;
  name: string;
  uid: string;
};

export type ModelComponent = {
  id: string;
  resource_name: string;
  resource_detail: {
    create_time: string;
    description: string;
    id: string;
    model_definition: string;
    model_definition_detail: {
      create_time: string;
      documentation_url: string;
      icon: string;
      id: string;
      model_spec: {
        $schema: string;
        additional_properties: boolean;
        maxProperties: number;
        minProperties: number;
        properties: {
          html_url: {
            description: string;
            examples: string[];
            maxLength: number;
            minLength: number;
            read_only: boolean;
            title: string;
            type: string;
            ui_component: string;
            ui_disabled: boolean;
            ui_hidden: boolean;
            ui_order: number;
          };
          repository: {
            description: string;
            examples: string[];
            maxLength: number;
            minLength: number;
            title: string;
            type: string;
            ui_component: string;
            ui_order: number;
          };
          tag: {
            description: string;
            examples: string[];
            maxLength: number;
            minLength: number;
            read_only: boolean;
            title: string;
            type: string;
            ui_component: string;
            ui_disabled: boolean;
            ui_order: number;
          };
        };
        required: string[];
        title: string;
        type: string;
      };
      name: string;
      release_stage: string;
      title: string;
      uid: string;
      update_time: string;
    };
    name: string;
    state: string;
    task: string;
    uid: string;
    update_time: string;
    user: string;
    visibility: string;
  };
  metadata: any;
  dependencies: Record<string, any>;
};

export type Pipeline = {
  name: string;
  uid: string;
  id: string;
  description: string;
  mode: PipelineMode;
  state: PipelineState;
  user: string;
  create_time: string;
  update_time: string;
  recipe: PipelineRecipe;
};

export type RawPipelineRecipeComponent = {
  id: string;
  resource_name: string;
  resource_detail?: Record<string, any>;
};
