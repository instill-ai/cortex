import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  Icons,
  Input,
  ModelLogo,
  Select,
  Textarea,
} from "@instill-ai/design-system";
import { ImageWithFallback } from "../../components";

const CreateAIFormSchema = z
  .object({
    id: z.string(),
    description: z.string().nullable(),
    connector_definition_name: z.string(),
    configuration: z.object({
      api_key: z.string().nullable(),
      server_url: z.string().nullable(),
      task: z.string().nullable(),
      engine: z.string().nullable(),
      model_id: z.string().nullable(),
    }),
  })
  .superRefine((state, ctx) => {
    if (
      state.connector_definition_name ===
      "connector-definitions/stability-ai-model"
    ) {
      if (!state.configuration.api_key) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "API Key is required",
          path: ["configuration", "api_key"],
        });
      }

      if (!state.configuration.task) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Task is required",
          path: ["configuration", "task"],
        });
      }

      if (!state.configuration.engine) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Engine is required",
          path: ["configuration", "engine"],
        });
      }
    }

    if (
      state.connector_definition_name ===
      "connector-definitions/instill-ai-model"
    ) {
      if (!state.configuration.model_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Model ID is required",
          path: ["configuration", "model_id"],
        });
      }

      if (!state.configuration.server_url) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Server URL is required",
          path: ["configuration", "server_url"],
        });
      }
    }
  });

export const CreateAIForm = () => {
  const form = useForm<z.infer<typeof CreateAIFormSchema>>({
    resolver: zodResolver(CreateAIFormSchema),
    defaultValues: {
      connector_definition_name: "connector-definitions/instill-ai-model",
    },
  });

  function onSubmit(data: z.infer<typeof CreateAIFormSchema>) {
    alert(JSON.stringify(data));
  }

  return (
    <Form.Root {...form}>
      <form
        className="flex flex-col space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Form.Field
          control={form.control}
          name="id"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label htmlFor={field.name}>ID *</Form.Label>
                <Form.Control>
                  <Input.Root>
                    <Input.Core
                      id={field.name}
                      type="text"
                      placeholder="AI's name"
                      {...field}
                    />
                  </Input.Root>
                </Form.Control>
                <Form.Description>
                  Pick an ID to help you identify this resource. The ID conforms
                  to RFC-1034, which restricts to letters, numbers, and hyphen,
                  with the first character a letter, the last a letter or a
                  number, and a 63 character maximum.
                </Form.Description>
                <Form.Message />
              </Form.Item>
            );
          }}
        />
        <Form.Field
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label htmlFor={field.name}>Description</Form.Label>
                <Form.Control>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder="Description"
                    value={field.value ?? ""}
                  />
                </Form.Control>
                <Form.Description>
                  Fill with a short description.
                </Form.Description>
                <Form.Message />
              </Form.Item>
            );
          }}
        />
        <Form.Field
          control={form.control}
          name="connector_definition_name"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label htmlFor={field.name}>AI Connector Type</Form.Label>
                <Select.Root>
                  <Form.Control>
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Select an AI connector type" />
                    </Select.Trigger>
                  </Form.Control>
                  <Select.Content>
                    <Select.Item
                      className="flex flex-row space-x-2"
                      value="connector-definitions/instill-ai-model"
                    >
                      <ModelLogo width={20} variant="square" />
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        Instill Model
                      </p>
                    </Select.Item>
                    <Select.Item
                      className="flex flex-row space-x-2"
                      value="connector-definitions/stability-ai-model"
                    >
                      <ImageWithFallback
                        src={"/icons/stability-ai/logo.png"}
                        width={20}
                        height={20}
                        alt="Stability AI model logo"
                        fallbackImg={
                          <Icons.Model className="w-5 h-5 stroke-semantic-fg-primary" />
                        }
                      />
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        Stability AI Model
                      </p>
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
                <Form.Description>
                  Fill with a short description.
                </Form.Description>
                <Form.Message />
              </Form.Item>
            );
          }}
        />
        <Form.Field
          control={form.control}
          name="configuration.api_key"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label htmlFor={field.name}>API Key *</Form.Label>
                <Form.Control>
                  <Input.Root>
                    <Input.Core
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="API Key"
                      value={field.value ?? ""}
                    />
                  </Input.Root>
                </Form.Control>
                <Form.Description>
                  Access to your API keys can then be managed through Stability
                  AI's Account page.
                </Form.Description>
                <Form.Message />
              </Form.Item>
            );
          }}
        />
        <Form.Field
          control={form.control}
          name="configuration.task"
          render={({ field }) => {
            return (
              <Form.Item
                className={
                  form.getValues("connector_definition_name") !==
                  "connector-definitions/stability-ai-model"
                    ? "hidden"
                    : ""
                }
              >
                <Form.Label htmlFor={field.name}>Task *</Form.Label>
                <Select.Root>
                  <Form.Control>
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Select an AI task" />
                    </Select.Trigger>
                  </Form.Control>
                  <Select.Content>
                    <Select.Item value="Text to Image">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        Text to Image
                      </p>
                    </Select.Item>
                    <Select.Item value="Image to Image">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        Image to Image
                      </p>
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
                <Form.Description>AI task type.</Form.Description>
                <Form.Message />
              </Form.Item>
            );
          }}
        />
        <Form.Field
          control={form.control}
          name="configuration.engine"
          render={({ field }) => {
            return (
              <Form.Item
                className={
                  form.getValues("connector_definition_name") !==
                  "connector-definitions/stability-ai-model"
                    ? "hidden"
                    : ""
                }
              >
                <Form.Label htmlFor={field.name}>Engine</Form.Label>
                <Select.Root>
                  <Form.Control>
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Select an AI engine" />
                    </Select.Trigger>
                  </Form.Control>
                  <Select.Content>
                    <Select.Item value="stable-diffusion-v1">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        stable-diffusion-v1
                      </p>
                    </Select.Item>
                    <Select.Item value="stable-diffusion-v1-5">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        stable-diffusion-v1-5
                      </p>
                    </Select.Item>
                    <Select.Item value="stable-diffusion-512-v2-0">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        stable-diffusion-512-v2-0
                      </p>
                    </Select.Item>
                    <Select.Item value="stable-diffusion-768-v2-0">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        stable-diffusion-768-v2-0
                      </p>
                    </Select.Item>
                    <Select.Item value="stable-diffusion-512-v2-1">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        stable-diffusion-512-v2-1
                      </p>
                    </Select.Item>
                    <Select.Item value="stable-diffusion-768-v2-1">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        stable-diffusion-768-v2-1
                      </p>
                    </Select.Item>
                    <Select.Item value="stable-diffusion-xl-beta-v2-2-2">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        stable-diffusion-xl-beta-v2-2-2
                      </p>
                    </Select.Item>
                    <Select.Item value="stable-inpainting-v1-0">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        stable-inpainting-v1-0
                      </p>
                    </Select.Item>
                    <Select.Item value="stable-inpainting-512-v2-0">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        stable-inpainting-512-v2-0
                      </p>
                    </Select.Item>
                    <Select.Item value="esrgan-v1-x2plus">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        esrgan-v1-x2plus
                      </p>
                    </Select.Item>
                    <Select.Item value="stable-diffusion-x4-latent-upscaler">
                      <p className="my-auto text-semantic-fg-primary product-body-text-2-regular">
                        stable-diffusion-x4-latent-upscaler
                      </p>
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
                <Form.Description>Engine (model) to use.</Form.Description>
                <Form.Message />
              </Form.Item>
            );
          }}
        />
        <Form.Field
          control={form.control}
          name="configuration.server_url"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label htmlFor={field.name}>Server URL *</Form.Label>
                <Form.Control>
                  <Input.Root>
                    <Input.Core
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="URL"
                      value={field.value ?? ""}
                    />
                  </Input.Root>
                </Form.Control>
                <Form.Description>
                  Base URL for the Instill Model API.
                </Form.Description>
                <Form.Message />
              </Form.Item>
            );
          }}
        />
        <Form.Field
          control={form.control}
          name="configuration.model_id"
          render={({ field }) => {
            return (
              <Form.Item>
                <Form.Label htmlFor={field.name}>Model ID *</Form.Label>
                <Form.Control>
                  <Input.Root>
                    <Input.Core
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="ID"
                      value={field.value ?? ""}
                    />
                  </Input.Root>
                </Form.Control>
                <Form.Description>ID of the model to use.</Form.Description>
                <Form.Message />
              </Form.Item>
            );
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </Form.Root>
  );
};
