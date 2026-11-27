import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { generatedIconNames } from "@sh-webplatform/icons";
import "../../src/components/form/wk-button/index.js";

const meta: Meta = {
  title: "Form/Button",
  component: "wk-button",
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    animated: { control: "boolean" },
    icon: { control: "select", options: ["", ...generatedIconNames] },
    iconPosition: { control: "select", options: ["start", "end"] },
    iconOnly: { control: "boolean" },
  },
  args: {
    label: "Save",
    variant: "primary",
    size: "md",
    disabled: false,
    animated: true,
    icon: "",
    iconPosition: "start",
    iconOnly: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-button
        variant=${args.variant}
        size=${args.size}
        ?disabled=${args.disabled}
        ?animated=${args.animated}
        icon=${args.icon || undefined}
        icon-position=${args.iconPosition}
        ?icon-only=${args.iconOnly}
        >${args.label}</wk-button
      >
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {};

export const WithIcon: Story = {
  args: { icon: "check" },
};

export const Sizes: Story = {
  render: () => html`
    <div style="padding:1.5rem;display:flex;gap:0.75rem;align-items:center">
      <wk-button size="sm">Small</wk-button>
      <wk-button size="md">Medium</wk-button>
      <wk-button size="lg">Large</wk-button>
    </div>
  `,
};

export const IconOnly: Story = {
  args: { icon: "search", iconOnly: true, label: "Search" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
