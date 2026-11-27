import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { bootstrapWebkit } from "../../src/bootstrap.js";
import "../../src/components/layout/wk-icon/index.js";

bootstrapWebkit({
  icons: {
    get: (name) =>
      ({ check: "✓", close: "×", info: "ℹ", warn: "!" })[name],
  },
});

const meta: Meta = {
  title: "Layout/Icon",
  component: "wk-icon",
  argTypes: {
    name: {
      control: "select",
      options: ["check", "close", "info", "warn", "missing"],
    },
    label: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    name: "check",
    label: "Success",
    size: "md",
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-icon name=${args.name} label=${args.label} size=${args.size}></wk-icon>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
