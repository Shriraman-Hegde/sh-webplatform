import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-alert/index.js";

const meta: Meta = {
  title: "Layout/Alert",
  component: "wk-alert",
  argTypes: {
    tone: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
    heading: { control: "text" },
    body: { control: "text" },
  },
  args: {
    tone: "info",
    heading: "Heads up",
    body: "Review the request before submitting.",
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 32rem">
      <wk-alert tone=${args.tone} heading=${args.heading}>${args.body}</wk-alert>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Danger: Story = {
  args: {
    tone: "danger",
    heading: "Action required",
    body: "This record failed validation.",
  },
};
