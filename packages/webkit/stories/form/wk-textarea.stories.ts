import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-textarea/index.js";

const meta: Meta = {
  title: "Form/Textarea",
  component: "wk-textarea",
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    rows: { control: { type: "number", min: 2, max: 12 } },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
  args: {
    label: "Notes",
    name: "notes",
    value: "Short description",
    rows: 4,
    disabled: false,
    error: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 28rem">
      <wk-textarea
        label=${args.label}
        name=${args.name}
        rows=${args.rows}
        .value=${args.value}
        ?disabled=${args.disabled}
        ?error=${args.error}
      ></wk-textarea>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
