import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-spinner/index.js";

const meta: Meta = {
  title: "Layout/Spinner",
  component: "wk-spinner",
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`<div style="padding: 1.5rem"><wk-spinner label="Saving…"></wk-spinner></div>`,
};
