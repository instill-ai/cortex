import { PipelineTemplate } from "../type";

export const templates: PipelineTemplate[] = [
  {
    id: "Stability AI - Text to Image",
    category: "Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur elit adipiscing, sed do eiusm tem dolor sit amet, consectetur.",
    author: "InstillAI",
    recipe: {
      version: "v1alpha",
      components: [
        {
          id: "start",
          resource_name: "",
          resource: null,
          configuration: {
            metadata: {
              prompts: {
                title: "prompts",
                type: "text_array",
              },
            },
          },
          connector_definition: null,
          type: "COMPONENT_TYPE_OPERATOR",
          definition_name: "operator-definitions/start-operator",
        },
        {
          id: "end",
          resource_name: "",
          resource: null,
          configuration: {
            input: {
              results: "{ ai_1.output.images }",
            },
            metadata: {
              results: {
                title: "results",
              },
            },
          },
          connector_definition: null,
          type: "COMPONENT_TYPE_OPERATOR",
          definition_name: "operator-definitions/end-operator",
        },
        {
          id: "ai_1",
          resource_name: "",
          resource: null,
          configuration: {
            input: {
              engine: "stable-diffusion-xl-1024-v1-0",
              height: 1024,
              prompts: "{ start.prompts }",
              task: "TASK_TEXT_TO_IMAGE",
              width: 1024,
            },
          },
          connector_definition: {
            name: "connector-definitions/ai-stability-ai",
            uid: "c86a95cc-7d32-4e22-a290-8c699f6705a4",
            id: "ai-stability-ai",
            title: "Stability AI",
            documentation_url:
              "https://www.instill.tech/docs/vdp/ai-connectors/stability-ai",
            icon: "stabilityai.svg",
            spec: {
              resource_specification: {},
              component_specification: {},
              openapi_specifications: {},
            },
            type: "CONNECTOR_TYPE_AI",
            tombstone: false,
            public: true,
            custom: false,
            icon_url: "",
            vendor: "stabilityAI",
            vendor_attributes: {},
          },
          type: "COMPONENT_TYPE_CONNECTOR_AI",
          definition_name: "connector-definitions/ai-stability-ai",
        },
      ],
    },
  },
  {
    id: "Stability AI - Image to Image",
    category: "Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur elit adipiscing, sed do eiusm tem dolor sit amet, consectetur.",
    author: "InstillAI",

    recipe: {
      version: "v1alpha",
      components: [
        {
          id: "start",
          resource_name: "",
          resource: null,
          configuration: {
            metadata: {
              prompts: {
                title: "prompts ",
                type: "text_array",
              },
            },
          },
          type: "COMPONENT_TYPE_OPERATOR",
          operator_definition: null,
          definition_name: "operator-definitions/start-operator",
        },
        {
          id: "end",
          resource_name: "",
          resource: null,
          configuration: {
            input: {
              results: "{ ai_1.output.images }",
            },
            metadata: {
              results: {
                title: "results",
              },
            },
          },
          type: "COMPONENT_TYPE_OPERATOR",
          operator_definition: null,
          definition_name: "operator-definitions/end-operator",
        },
        {
          id: "ai_1",
          resource_name: "users/admin/connector-resources/hello-world",
          resource: null,
          configuration: {
            input: {
              engine: "stable-diffusion-xl-1024-v1-0",
              init_image: "{ start.image }",
              prompts: "{ start.prompts }",
              steps: 2,
              task: "TASK_IMAGE_TO_IMAGE",
            },
          },
          type: "COMPONENT_TYPE_CONNECTOR_AI",
          connector_definition: {
            name: "connector-definitions/ai-stability-ai",
            uid: "c86a95cc-7d32-4e22-a290-8c699f6705a4",
            id: "ai-stability-ai",
            title: "Stability AI",
            documentation_url:
              "https://www.instill.tech/docs/vdp/ai-connectors/stability-ai",
            icon: "stabilityai.svg",
            spec: {
              resource_specification: {},
              component_specification: {},
              openapi_specifications: {},
            },
            type: "CONNECTOR_TYPE_AI",
            tombstone: false,
            public: true,
            custom: false,
            icon_url: "",
            vendor: "stabilityAI",
            vendor_attributes: {},
          },
          definition_name: "connector-definitions/ai-stability-ai",
        },
        {
          id: "ai_2",
          resource_name: "users/admin/connector-resources/hello-world",
          resource: null,
          configuration: {
            input: {
              engine: "stable-diffusion-xl-1024-v1-0",
              init_image: "{ start.image }",
              prompts: "{ start.prompts }",
              steps: 2,
              task: "TASK_IMAGE_TO_IMAGE",
            },
          },
          type: "COMPONENT_TYPE_CONNECTOR_AI",
          connector_definition: {
            name: "connector-definitions/ai-stability-ai",
            uid: "c86a95cc-7d32-4e22-a290-8c699f6705a4",
            id: "ai-stability-ai",
            title: "Stability AI",
            documentation_url:
              "https://www.instill.tech/docs/vdp/ai-connectors/stability-ai",
            icon: "stabilityai.svg",
            spec: {
              resource_specification: {},
              component_specification: {},
              openapi_specifications: {},
            },
            type: "CONNECTOR_TYPE_AI",
            tombstone: false,
            public: true,
            custom: false,
            icon_url: "",
            vendor: "stabilityAI",
            vendor_attributes: {},
          },
          definition_name: "connector-definitions/ai-stability-ai",
        },
      ],
    },
  },
  {
    id: "OpenAI - Text Generation",
    category: "Test",
    description:
      "Lorem ipsum dolor sit amet, consectetur elit adipiscing, sed do eiusm tem dolor sit amet, consectetur.",
    author: "InstillAI",
    recipe: {
      version: "v1alpha",
      components: [
        {
          id: "start",
          resource_name: "",
          resource: null,
          configuration: {
            metadata: {
              prompt: {
                title: "prompt",
                type: "text",
              },
            },
          },
          type: "COMPONENT_TYPE_OPERATOR",
          operator_definition: null,
          definition_name: "operator-definitions/start-operator",
        },
        {
          id: "end",
          resource: null,
          resource_name: "",
          configuration: {
            input: {
              result: "{ ai_1.output.texts }",
            },
            metadata: {
              result: {
                title: "result",
              },
            },
          },
          type: "COMPONENT_TYPE_OPERATOR",
          operator_definition: null,
          definition_name: "operator-definitions/end-operator",
        },
        {
          id: "ai_1",
          resource: null,
          resource_name: "users/admin/connector-resources/openai-dev",
          configuration: {
            input: {
              model: "gpt-4",
              prompt: "{ start.prompt }",
              task: "TASK_TEXT_GENERATION",
              temperature: 1,
            },
          },
          type: "COMPONENT_TYPE_CONNECTOR_AI",
          connector_definition: {
            name: "connector-definitions/ai-openai",
            uid: "9fb6a2cb-bff5-4c69-bc6d-4538dd8e3362",
            id: "ai-openai",
            title: "OpenAI",
            documentation_url:
              "https://www.instill.tech/docs/vdp/ai-connectors/openai",
            icon: "openai.svg",
            spec: {
              resource_specification: {},
              component_specification: {},
              openapi_specifications: {},
            },
            type: "CONNECTOR_TYPE_AI",
            tombstone: false,
            public: true,
            custom: false,
            icon_url: "",
            vendor: "openAI",
            vendor_attributes: {},
          },
          definition_name: "connector-definitions/ai-openai",
        },
      ],
    },
  },
];
