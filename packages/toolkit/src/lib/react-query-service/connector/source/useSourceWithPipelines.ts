import { useQuery } from "@tanstack/react-query";
import { usePipelines } from "../../pipeline";
import { useSource } from "./useSource";
import type { SourceWithPipelines } from "../../../vdp-sdk";
import type { Nullable } from "../../../type";
import { getComponentFromPipelineRecipe } from "../../../utility";

export const useSourceWithPipelines = ({
  sourceName,
  accessToken,
  enabled,
  retry,
}: {
  sourceName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  /**
   * - Default is 3
   * - Set to false to disable retry
   */
  retry?: false | number;
}) => {
  const pipelines = usePipelines({ enabled, accessToken, retry });
  const source = useSource({ enabled, sourceName, accessToken, retry });

  let enableQuery = false;

  if (sourceName && source.isSuccess && pipelines.isSuccess && enabled) {
    enableQuery = true;
  }

  return useQuery(
    ["sources", sourceName, "with-pipelines"],
    async () => {
      if (!sourceName) {
        return Promise.reject(new Error("invalid source name"));
      }

      if (!source.data) {
        return Promise.reject(new Error("invalid source data"));
      }

      if (!pipelines.data) {
        return Promise.reject(new Error("invalid pipeline data"));
      }

      const targetPipelines = pipelines.data.filter(
        (e) =>
          getComponentFromPipelineRecipe({
            recipe: e.recipe,
            componentName: "source",
          })?.resource_detail.id === source.data.id
      );

      const sourceWithPipelines: SourceWithPipelines = {
        ...source.data,
        pipelines: targetPipelines,
      };

      return Promise.resolve(sourceWithPipelines);
    },
    {
      enabled: enableQuery,
      retry: retry === false ? false : retry ? retry : 3,
    }
  );
};

const tt = {
  pipelines: [
    {
      name: "pipelines/async-pipeline",
      uid: "2be89945-0260-4a64-9609-0299bbb29292",
      id: "async-pipeline",
      description: "",
      recipe: {
        version: "v1alpha",
        components: [
          {
            id: "a9f49d9c-a614-4a01-928d-8f4a8c610969",
            resource_name: "source-connectors/source-grpc",
            resource_detail: {
              connector: {
                create_time: "2023-05-29T07:51:22.269768Z",
                description: "",
                state: "STATE_CONNECTED",
                update_time: "2023-05-29T07:51:22.271897Z",
                user: "users/573bd4c7-7a40-4f87-b0ba-b7ee695c5194",
              },
              id: "source-grpc",
              name: "source-connectors/source-grpc",
              source_connector_definition:
                "source-connector-definitions/source-grpc",
              source_connector_definition_detail: {
                connector_definition: {
                  documentation_url:
                    "https://www.instill.tech/docs/source-connectors/grpc",
                  icon: "grpc.svg",
                  public: true,
                  title: "gRPC",
                },
                id: "source-grpc",
                name: "source-connector-definitions/source-grpc",
                uid: "82ca7d29-a35c-4222-b900-8d6878195e7a",
              },
              uid: "60d0954b-0a2d-4179-9dae-7e03eea8e2e1",
            },
            metadata: null,
            dependencies: {},
          },
          {
            id: "0ea4765b-e597-4e8b-9230-94d3887aad57",
            resource_name: "models/hello-world",
            resource_detail: {
              create_time: "2023-05-26T09:22:59.187915Z",
              description: "",
              id: "hello-world",
              model_definition: "model-definitions/github",
              model_definition_detail: {
                create_time: "2023-05-26T09:20:29.591389Z",
                documentation_url:
                  "https://www.instill.tech/docs/import-models/github",
                icon: "github.svg",
                id: "github",
                model_spec: {
                  $schema: "http://json-schema.org/draft-07/schema#",
                  additional_properties: false,
                  maxProperties: 3,
                  minProperties: 2,
                  properties: {
                    html_url: {
                      description:
                        "The URL of the GitHub repository, e.g. `https://github.com/instill-ai/model-yolov7`.",
                      examples: [
                        "https://github.com/instill-ai/model-yolov7",
                        "https://github.com/instill-ai/model-mobilenetv2",
                      ],
                      maxLength: 1023,
                      minLength: 0,
                      read_only: true,
                      title: "Github repository URL",
                      type: "string",
                      ui_component: "text",
                      ui_disabled: true,
                      ui_hidden: true,
                      ui_order: 2,
                    },
                    repository: {
                      description:
                        "The name of a public GitHub repository, e.g. `instill-ai/model-yolov7`.",
                      examples: [
                        "instill-ai/model-yolov7",
                        "instill-ai/model-mobilenetv2",
                      ],
                      maxLength: 1023,
                      minLength: 0,
                      title: "GitHub repository",
                      type: "string",
                      ui_component: "text",
                      ui_order: 0,
                    },
                    tag: {
                      description:
                        "The tag of the GitHub repository, e.g., `v0.1.0`.",
                      examples: ["v0.1.0-alpha", "v1.0.0"],
                      maxLength: 200,
                      minLength: 0,
                      read_only: true,
                      title: "GitHub repository tag",
                      type: "string",
                      ui_component: "text",
                      ui_disabled: true,
                      ui_order: 1,
                    },
                  },
                  required: ["repository", "tag"],
                  title: "GitHub spec for model",
                  type: "object",
                },
                name: "model-definitions/github",
                release_stage: "RELEASE_STAGE_ALPHA",
                title: "GitHub",
                uid: "909c3278-f7d1-461c-9352-87741bef11d3",
                update_time: "2023-05-26T09:20:29.591389Z",
              },
              name: "models/hello-world",
              state: "STATE_ONLINE",
              task: "TASK_CLASSIFICATION",
              uid: "ef60bef7-bdb3-410c-adfe-27e635071506",
              update_time: "2023-05-26T09:23:00.263711Z",
              user: "users/c14f8376-a409-4694-a4b3-4da9074296c4",
              visibility: "VISIBILITY_PUBLIC",
            },
            metadata: null,
            dependencies: {},
          },
          {
            id: "81ae64fa-2bc0-40b3-995a-0b79b5998e35",
            resource_name: "destination-connectors/hello-destination",
            resource_detail: {
              connector: {
                create_time: "2023-05-29T07:51:38.852077Z",
                description: "",
                state: "STATE_CONNECTED",
                update_time: "2023-05-29T07:51:38.854280Z",
                user: "users/573bd4c7-7a40-4f87-b0ba-b7ee695c5194",
              },
              destination_connector_definition:
                "destination-connector-definitions/destination-google-sheets",
              destination_connector_definition_detail: {
                connector_definition: {
                  documentation_url:
                    "https://docs.airbyte.io/integrations/destinations/google-sheets",
                  icon: "google-sheets.svg",
                  public: true,
                  title: "Google Sheets",
                },
                id: "destination-google-sheets",
                name: "destination-connector-definitions/destination-google-sheets",
                uid: "a4cbd2d1-8dbe-4818-b8bc-b90ad782d12a",
              },
              id: "hello-destination",
              name: "destination-connectors/hello-destination",
              uid: "263d6dbe-e570-49fe-bc06-3be854ebbfb6",
            },
            metadata: null,
            dependencies: {},
          },
        ],
      },
      mode: "MODE_ASYNC",
      state: "STATE_ACTIVE",
      user: "users/573bd4c7-7a40-4f87-b0ba-b7ee695c5194",
      create_time: "2023-05-29T07:51:56.271245Z",
      update_time: "2023-05-29T07:51:56.271245Z",
    },
    {
      name: "pipelines/pipeline-yooy",
      uid: "7b76b183-f93a-428d-979b-3e90d24bd7f1",
      id: "pipeline-yooy",
      description: "",
      recipe: {
        version: "v1alpha",
        components: [
          {
            id: "f80652a7-d680-4019-869f-02309d0a7354",
            resource_name: "source-connectors/source-http",
            resource_detail: {
              connector: {
                create_time: "2023-05-29T07:24:16.004852Z",
                description: "",
                state: "STATE_CONNECTED",
                update_time: "2023-05-29T07:24:16.008125Z",
                user: "users/573bd4c7-7a40-4f87-b0ba-b7ee695c5194",
              },
              id: "source-http",
              name: "source-connectors/source-http",
              source_connector_definition:
                "source-connector-definitions/source-http",
              source_connector_definition_detail: {
                connector_definition: {
                  documentation_url:
                    "https://www.instill.tech/docs/source-connectors/http",
                  icon: "http.svg",
                  public: true,
                  title: "HTTP",
                },
                id: "source-http",
                name: "source-connector-definitions/source-http",
                uid: "f20a3c02-c70e-4e76-8566-7c13ca11d18d",
              },
              uid: "55545bec-a85e-4adb-b95b-fb9f8d7fdf6b",
            },
            metadata: null,
            dependencies: {},
          },
          {
            id: "16cdb67e-80f8-4a9f-98ef-dcbde93edcd8",
            resource_name: "models/hello-world",
            resource_detail: {
              create_time: "2023-05-26T09:22:59.187915Z",
              description: "",
              id: "hello-world",
              model_definition: "model-definitions/github",
              model_definition_detail: {
                create_time: "2023-05-26T09:20:29.591389Z",
                documentation_url:
                  "https://www.instill.tech/docs/import-models/github",
                icon: "github.svg",
                id: "github",
                model_spec: {
                  $schema: "http://json-schema.org/draft-07/schema#",
                  additional_properties: false,
                  maxProperties: 3,
                  minProperties: 2,
                  properties: {
                    html_url: {
                      description:
                        "The URL of the GitHub repository, e.g. `https://github.com/instill-ai/model-yolov7`.",
                      examples: [
                        "https://github.com/instill-ai/model-yolov7",
                        "https://github.com/instill-ai/model-mobilenetv2",
                      ],
                      maxLength: 1023,
                      minLength: 0,
                      read_only: true,
                      title: "Github repository URL",
                      type: "string",
                      ui_component: "text",
                      ui_disabled: true,
                      ui_hidden: true,
                      ui_order: 2,
                    },
                    repository: {
                      description:
                        "The name of a public GitHub repository, e.g. `instill-ai/model-yolov7`.",
                      examples: [
                        "instill-ai/model-yolov7",
                        "instill-ai/model-mobilenetv2",
                      ],
                      maxLength: 1023,
                      minLength: 0,
                      title: "GitHub repository",
                      type: "string",
                      ui_component: "text",
                      ui_order: 0,
                    },
                    tag: {
                      description:
                        "The tag of the GitHub repository, e.g., `v0.1.0`.",
                      examples: ["v0.1.0-alpha", "v1.0.0"],
                      maxLength: 200,
                      minLength: 0,
                      read_only: true,
                      title: "GitHub repository tag",
                      type: "string",
                      ui_component: "text",
                      ui_disabled: true,
                      ui_order: 1,
                    },
                  },
                  required: ["repository", "tag"],
                  title: "GitHub spec for model",
                  type: "object",
                },
                name: "model-definitions/github",
                release_stage: "RELEASE_STAGE_ALPHA",
                title: "GitHub",
                uid: "909c3278-f7d1-461c-9352-87741bef11d3",
                update_time: "2023-05-26T09:20:29.591389Z",
              },
              name: "models/hello-world",
              state: "STATE_ONLINE",
              task: "TASK_CLASSIFICATION",
              uid: "ef60bef7-bdb3-410c-adfe-27e635071506",
              update_time: "2023-05-26T09:23:00.263711Z",
              user: "users/c14f8376-a409-4694-a4b3-4da9074296c4",
              visibility: "VISIBILITY_PUBLIC",
            },
            metadata: null,
            dependencies: {},
          },
          {
            id: "35bccbe2-ba19-4f5a-9f47-40ca9144333a",
            resource_name: "destination-connectors/destination-http",
            resource_detail: {
              connector: {
                create_time: "2023-05-29T07:24:25.426090Z",
                description: "",
                state: "STATE_CONNECTED",
                update_time: "2023-05-29T07:24:25.427663Z",
                user: "users/573bd4c7-7a40-4f87-b0ba-b7ee695c5194",
              },
              destination_connector_definition:
                "destination-connector-definitions/destination-http",
              destination_connector_definition_detail: {
                connector_definition: {
                  documentation_url:
                    "https://www.instill.tech/docs/destination-connectors/http",
                  icon: "http.svg",
                  public: true,
                  title: "HTTP",
                },
                id: "destination-http",
                name: "destination-connector-definitions/destination-http",
                uid: "909c3278-f7d1-461c-9352-87741bef11d3",
              },
              id: "destination-http",
              name: "destination-connectors/destination-http",
              uid: "409860c1-6897-45d7-9982-f2c82d2ce521",
            },
            metadata: null,
            dependencies: {},
          },
        ],
      },
      mode: "MODE_SYNC",
      state: "STATE_ACTIVE",
      user: "users/573bd4c7-7a40-4f87-b0ba-b7ee695c5194",
      create_time: "2023-05-29T07:24:30.433031Z",
      update_time: "2023-05-29T07:24:39.628513Z",
    },
  ],
  next_page_token: "",
  total_size: "2",
};
