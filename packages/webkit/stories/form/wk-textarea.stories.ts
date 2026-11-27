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
    size: { control: "select", options: ["sm", "md", "lg"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    rich: { control: "boolean" },
    showIcons: { control: "boolean" },
  },
  args: {
    label: "Notes",
    name: "notes",
    value: "Short description",
    rows: 4,
    size: "md",
    placeholder: "",
    disabled: false,
    error: false,
    rich: false,
    showIcons: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 28rem">
      <wk-textarea
        label=${args.label}
        name=${args.name}
        rows=${args.rows}
        size=${args.size}
        placeholder=${args.placeholder}
        .value=${args.value}
        ?disabled=${args.disabled}
        ?error=${args.error}
        ?rich=${args.rich}
        ?show-icons=${args.showIcons}
      ></wk-textarea>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const RichText: Story = {
  args: {
    rich: true,
    value: "<p>Hello <strong>Team Alpha</strong>.</p>",
    placeholder: "Add formatted notes…",
  },
};

export const RichTextWithIcons: Story = {
  args: {
    rich: true,
    showIcons: true,
    value: "<p>Hello <strong>Team Alpha</strong>.</p>",
  },
};
