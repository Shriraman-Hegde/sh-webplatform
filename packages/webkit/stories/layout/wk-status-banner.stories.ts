import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-status-banner/index.js";

const meta: Meta = {
  title: "Layout/Status Banner",
  component: "wk-status-banner",
  argTypes: {
    tone: {
      control: "select",
      options: ["empty", "loading", "error"],
    },
    message: { control: "text" },
  },
  args: {
    tone: "empty",
    message: "No linked records yet — submit the form to continue.",
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-status-banner
        tone=${args.tone}
        message=${args.message}
      ></wk-status-banner>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Empty: Story = {};

export const Loading: Story = {
  args: { tone: "loading", message: "Fetching linked records…" },
};

export const Error: Story = {
  args: { tone: "error", message: "Could not load linked records." },
};
