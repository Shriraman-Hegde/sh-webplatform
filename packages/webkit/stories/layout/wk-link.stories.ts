import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-link/index.js";

const meta: Meta = {
  title: "Layout/Link",
  component: "wk-link",
  argTypes: {
    label: { control: "text" },
    href: { control: "text" },
    target: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Open collateral",
    href: "/collateral/COL-77",
    target: "",
    disabled: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-link href=${args.href} target=${args.target} ?disabled=${args.disabled}
        >${args.label}</wk-link
      >
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
