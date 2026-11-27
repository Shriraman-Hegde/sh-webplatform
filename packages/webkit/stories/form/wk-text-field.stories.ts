import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-text-field/index.js";
import { attr, componentDocs, disabledArg, sizeArg } from "../_helpers.js";

const usage = `<wk-text-field label="Title" name="title" value="Sample"></wk-text-field>
<wk-text-field label="Search" leading-icon="search" placeholder="Find…"></wk-text-field>`;

const meta: Meta = {
  title: "Form/Text Field",
  component: "wk-text-field",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Single-line labeled input. Emits `wk-input`. Optional leading/trailing icons.",
    usage,
  ),
  argTypes: {
    label: attr("Field label.", { defaultValue: "" }),
    name: attr("Native name attribute.", { defaultValue: "" }),
    value: attr("Current value.", { defaultValue: "" }),
    placeholder: attr("Placeholder text.", { defaultValue: "" }),
    size: sizeArg,
    leadingIcon: attr("Optional leading icon name.", { defaultValue: "" }),
    trailingIcon: attr("Optional trailing icon name.", { defaultValue: "" }),
    disabled: disabledArg,
    error: attr("Error state styling.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
  },
  args: {
    label: "Title",
    name: "title",
    value: "Sample request",
    placeholder: "",
    size: "md",
    leadingIcon: "",
    trailingIcon: "",
    disabled: false,
    error: false,
  },
  render: (args) => html`
    <div style="max-width:28rem">
      <wk-text-field
        label=${args.label}
        name=${args.name}
        .value=${args.value}
        placeholder=${args.placeholder}
        size=${args.size}
        leading-icon=${args.leadingIcon || undefined}
        trailing-icon=${args.trailingIcon || undefined}
        ?disabled=${args.disabled}
        ?error=${args.error}
      ></wk-text-field>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const WithIcons: Story = {
  args: { leadingIcon: "search", placeholder: "Find…", value: "" },
};

export const Error: Story = {
  args: { error: true, value: "Invalid" },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:grid;gap:0.75rem;max-width:28rem">
      <wk-text-field label="Small" size="sm" value="sm"></wk-text-field>
      <wk-text-field label="Medium" size="md" value="md"></wk-text-field>
      <wk-text-field label="Large" size="lg" value="lg"></wk-text-field>
    </div>
  `,
};
