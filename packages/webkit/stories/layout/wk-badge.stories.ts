import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-badge/index.js";

const meta: Meta = {
  title: "Layout/Badge",
  component: "wk-badge",
  argTypes: {
    label: { control: "text" },
    tone: {
      control: "select",
      options: ["neutral", "accent", "success", "danger"],
    },
  },
  args: {
    label: "Draft",
    tone: "neutral",
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-badge tone=${args.tone}>${args.label}</wk-badge>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Accent: Story = {
  args: { tone: "accent", label: "Live" },
};

export const AllTones: Story = {
  render: () => html`
    <div style="padding: 1.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap">
      <wk-badge>Neutral</wk-badge>
      <wk-badge tone="accent">Accent</wk-badge>
      <wk-badge tone="success">Success</wk-badge>
      <wk-badge tone="danger">Danger</wk-badge>
    </div>
  `,
};
