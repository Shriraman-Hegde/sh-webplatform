import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-status-banner/index.js";
import { attr, componentDocs, sizeArg } from "../_helpers.js";

const usage = `<wk-status-banner tone="empty" message="Nothing yet."></wk-status-banner>
<wk-status-banner tone="loading" show-icon></wk-status-banner>`;

const meta: Meta = {
  title: "Layout/Status Banner",
  component: "wk-status-banner",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Page-level status. Icons optional via `show-icon`.",
    usage,
  ),
  argTypes: {
    tone: attr("Banner tone.", {
      control: "select",
      options: ["empty", "loading", "error"],
      defaultValue: "empty",
      type: '"empty" | "loading" | "error"',
    }),
    message: attr("Custom message (falls back by tone).", { defaultValue: "" }),
    size: sizeArg,
    showIcon: attr("Show tone icon.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    animated: attr("Animate loading icon.", {
      control: "boolean",
      defaultValue: "true",
      type: "boolean",
    }),
  },
  args: {
    tone: "empty",
    message: "No linked records yet.",
    size: "md",
    showIcon: false,
    animated: true,
  },
  render: (args) => html`
    <wk-status-banner
      tone=${args.tone}
      message=${args.message}
      size=${args.size}
      ?show-icon=${args.showIcon}
      ?animated=${args.animated}
    ></wk-status-banner>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Loading: Story = {
  args: { tone: "loading", showIcon: true, message: "Fetching…" },
};

export const Error: Story = {
  args: { tone: "error", showIcon: true, message: "Could not load." },
};
