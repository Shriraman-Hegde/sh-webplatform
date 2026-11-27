import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-link/index.js";
import { attr, componentDocs, disabledArg, sizeArg } from "../_helpers.js";

const usage = `<wk-link href="#item-a">ITEM-A</wk-link>
<wk-link href="#docs" icon="external-link" icon-position="end">Docs</wk-link>`;

const meta: Meta = {
  title: "Layout/Link",
  component: "wk-link",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Accessible link with optional icon and size.",
    usage,
  ),
  argTypes: {
    label: attr("Link text (slot).", { defaultValue: "" }),
    href: attr("Destination URL.", { defaultValue: "#" }),
    size: sizeArg,
    icon: attr("Optional icon name.", { defaultValue: "" }),
    iconPosition: attr("Icon placement.", {
      control: "select",
      options: ["start", "end"],
      defaultValue: "start",
      type: '"start" | "end"',
    }),
    disabled: disabledArg,
  },
  args: {
    label: "Open record",
    href: "#item-a",
    size: "md",
    icon: "",
    iconPosition: "start",
    disabled: false,
  },
  render: (args) => html`
    <wk-link
      href=${args.href}
      size=${args.size}
      icon=${args.icon || undefined}
      icon-position=${args.iconPosition}
      ?disabled=${args.disabled}
      >${args.label}</wk-link
    >
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const WithIcon: Story = {
  args: { icon: "link" },
};

export const IconRight: Story = {
  args: { icon: "external-link", iconPosition: "end" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
