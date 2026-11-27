import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { webkitIconNames } from "../../src/boot-icons.js";
import "../../src/components/form/wk-button/index.js";
import { attr, componentDocs, disabledArg, sizeArg } from "../_helpers.js";


const meta: Meta = {
  title: "Form/Button",
  component: "wk-button",
  tags: ["autodocs"],
  parameters: componentDocs("Button triggers an action. Supports variants, sizes, optional icons, and motion."),
  argTypes: {
    label: attr("Button label text (slot content).", { defaultValue: "Save" }),
    variant: attr("Visual style.", {
      control: "select",
      options: ["primary", "secondary", "ghost"],
      defaultValue: "primary",
      type: '"primary" | "secondary" | "ghost"',
    }),
    size: sizeArg,
    disabled: disabledArg,
    animated: attr("Enable hover motion (honors data-motion).", {
      control: "boolean",
      defaultValue: "true",
      type: "boolean",
    }),
    icon: attr("Optional icon name from the icon library.", {
      control: "select",
      options: ["", ...webkitIconNames],
      defaultValue: "",
    }),
    iconPosition: attr("Icon placement when icon is set.", {
      control: "select",
      options: ["start", "end"],
      defaultValue: "start",
      type: '"start" | "end"',
    }),
    iconOnly: attr("Render icon without label.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
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
  `,
};

export default meta;
type Story = StoryObj;

/** Docs landing — preview + Attributes controls (SC WebKit Overview pattern). */
export const Overview: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Cancel" },
};

export const WithIcon: Story = {
  args: { icon: "check", label: "Confirm" },
};

export const IconRight: Story = {
  args: { icon: "external-link", iconPosition: "end", label: "Open" },
};

export const IconOnly: Story = {
  args: { icon: "search", iconOnly: true, label: "Search" },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:0.75rem;align-items:center;flex-wrap:wrap">
      <wk-button size="sm">Small</wk-button>
      <wk-button size="md">Medium</wk-button>
      <wk-button size="lg">Large</wk-button>
    </div>
  `,
};

export const Disabled: Story = {
  args: { disabled: true },
};
