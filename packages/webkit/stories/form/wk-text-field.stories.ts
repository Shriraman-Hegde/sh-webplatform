import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-text-field/index.js";

const meta: Meta = {
  title: "Form/Text Field",
  component: "wk-text-field",
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
  args: {
    label: "Title",
    name: "title",
    value: "Sample request",
    disabled: false,
    error: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 28rem">
      <wk-text-field
        label=${args.label}
        name=${args.name}
        .value=${args.value}
        ?disabled=${args.disabled}
        ?error=${args.error}
      ></wk-text-field>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Error: Story = {
  args: { error: true, value: "" },
};
