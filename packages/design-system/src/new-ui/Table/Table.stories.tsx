import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { Tag } from "../Tag";

const meta: Meta<typeof Table> = {
  title: "Components/NewUi/Table",
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Regular: Story = {
  render: () => (
    <div className="rounded-sm border border-semantic-bg-line">
      <Table.Root>
        <Table.Header className="bg-semantic-bg-base-bg py-3">
          <Table.Row>
            <Table.Head className="w-auto px-6 text-xs font-semibold leading-none text-semantic-fg-primary text-opacity-80">
              Pipeline ID
            </Table.Head>
            <Table.Head className="w-[100px] px-6 text-xs font-semibold leading-none text-semantic-fg-primary text-opacity-80">
              Status
            </Table.Head>
            <Table.Head className="w-[200px] px-6 text-center text-xs font-semibold leading-none text-semantic-fg-primary text-opacity-80">
              Completed Triggers
            </Table.Head>
            <Table.Head className="w-[150px] px-6 text-center text-xs font-semibold leading-none text-semantic-fg-primary text-opacity-80">
              Errored Triggers
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row className="hover:bg-semantic-bg-alt-primary">
            <Table.Cell className="px-6 py-5 text-sm font-semibold leading-tight text-semantic-fg-primary">
              Pipeline-name-1
            </Table.Cell>
            <Table.Cell className="px-6">
              <Tag variant="lightRed" className="border-0" size="sm">
                Deleted
              </Tag>
            </Table.Cell>
            <Table.Cell className="px-6 text-center text-sm font-normal leading-tight text-semantic-fg-primary text-opacity-80">
              250
            </Table.Cell>
            <Table.Cell className="px-6 text-center text-sm font-normal leading-tight text-semantic-fg-primary text-opacity-80">
              250
            </Table.Cell>
          </Table.Row>
          <Table.Row className="hover:bg-semantic-bg-alt-primary">
            <Table.Cell className="px-6 py-5 text-sm font-semibold leading-tight text-semantic-fg-primary">
              Pipeline-name-1
            </Table.Cell>
            <Table.Cell className="px-6">
              <Tag variant="lightGreen" className="border-0" size="sm">
                Active
              </Tag>
            </Table.Cell>
            <Table.Cell className="px-6 text-center text-sm font-normal leading-tight text-semantic-fg-primary text-opacity-80">
              250
            </Table.Cell>
            <Table.Cell className="px-6 text-center text-sm font-normal leading-tight text-semantic-fg-primary text-opacity-80">
              250
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  ),
};
