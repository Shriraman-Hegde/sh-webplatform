import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-textarea/index.js";
import { attr, componentDocs, disabledArg, sizeArg } from "../_helpers.js";


const meta: Meta = {
  title: "Form/Textarea",
  component: "wk-textarea",
  tags: ["autodocs"],
  parameters: componentDocs("Multi-line notes. Plain by default; set `rich` for optional rich-text editing."),
  argTypes: {
    label: attr("Field label.", { defaultValue: "" }),
    name: attr("Native name attribute.", { defaultValue: "" }),
    value: attr("Current value (plain text or HTML when rich).", {
      defaultValue: "",
    }),
    rows: attr("Visible rows (plain mode).", {
      control: { type: "number", min: 2, max: 12 },
      defaultValue: "4",
      type: "number",
    }),
    size: sizeArg,
    placeholder: attr("Placeholder text.", { defaultValue: "" }),
    disabled: disabledArg,
    error: attr("Error state styling.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    rich: attr("Enable rich-text toolbar + HTML value.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    showIcons: attr("When rich, use icon glyphs in the toolbar.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
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
    <div style="max-width:28rem">
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

export const Overview: Story = {};

export const Rich: Story = {
  args: {
    rich: true,
    value: "<p>Hello <strong>Team Alpha</strong>.</p>",
  },
};

export const RichWithIcons: Story = {
  args: {
    rich: true,
    showIcons: true,
    value: "<p>Formatted notes</p>",
  },
};

export const Error: Story = {
  args: { error: true, value: "Fix me" },
};
