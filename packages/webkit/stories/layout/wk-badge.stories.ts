import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-badge/index.js";

const meta: Meta = {
  title: "Layout/Badge",
  component: "wk-badge",
};
export default meta;
type Story = StoryObj;

export const Tones: Story = {
  render: () =>
    html`<div style="padding: 1.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap">
      <wk-badge>Neutral</wk-badge>
      <wk-badge tone="accent">Accent</wk-badge>
      <wk-badge tone="success">Success</wk-badge>
      <wk-badge tone="danger">Danger</wk-badge>
    </div>`,
};
