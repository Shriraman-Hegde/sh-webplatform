import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-divider/index.js";

const meta: Meta = {
  title: "Layout/Divider",
  component: "wk-divider",
};
export default meta;
type Story = StoryObj;

export const Plain: Story = {
  render: () =>
    html`<div style="padding: 1.5rem"><wk-divider></wk-divider></div>`,
};

export const Labeled: Story = {
  render: () =>
    html`<div style="padding: 1.5rem"><wk-divider label="Details"></wk-divider></div>`,
};
