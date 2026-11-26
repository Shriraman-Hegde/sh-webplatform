import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";

const meta: Meta = {
  title: "Form/Button",
  component: "wk-button",
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () =>
    html`<div style="padding: 1.5rem"><wk-button variant="primary">Save</wk-button></div>`,
};

export const Secondary: Story = {
  render: () =>
    html`<div style="padding: 1.5rem"><wk-button variant="secondary">Cancel</wk-button></div>`,
};
