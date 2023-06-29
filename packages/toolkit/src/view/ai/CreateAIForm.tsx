import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Select } from "@instill-ai/design-system";

const CreateAIFormSchema = z.object({
  id: z.string(),
  description: z.string().nullable(),
  connector_definition_name: z.string(),
  configuration: z.object({}),
});

export const CreateAIForm = () => {
  const form = useForm<z.infer<typeof CreateAIFormSchema>>({
    resolver: zodResolver(CreateAIFormSchema),
    defaultValues: {
      id: "",
      description: "",
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
                  <Input.Root>
                    <Input.Core
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Description"
                      value={field.value ?? ""}
                    />
                  </Input.Root>
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
                <Form.Label htmlFor={field.name}>Description</Form.Label>

                <Select.Root>
                  <Form.Control>
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Select a fruit" />
                    </Select.Trigger>
                  </Form.Control>
                  <Select.Content>
                    <Select.Item
                      className="flex flex-row space-x-2"
                      value="connector-definitions/stability-ai-model"
                    >
                      <p>Instill Model</p>
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

        <button type="submit">Submit</button>
      </form>
    </Form.Root>
  );
};
