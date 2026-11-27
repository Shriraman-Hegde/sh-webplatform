import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-rich-text/index.js";

const meta: Meta = {
  title: "Form/Rich Text",
  component: "wk-rich-text",
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    showIcons: { control: "boolean" },
  },
  args: {
    label: "Notes",
    placeholder: "Add formatted notes…",
    size: "md",
    disabled: false,
    error: false,
    showIcons: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 28rem">
      <wk-rich-text
        label=${args.label}
        placeholder=${args.placeholder}
        size=${args.size}
        ?disabled=${args.disabled}
        ?error=${args.error}
        ?show-icons=${args.showIcons}
        .value=${"<p>Hello <strong>Team Alpha</strong>.</p>"}
      ></wk-rich-text>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithToolbarIcons: Story = {
  args: { showIcons: true },
};
