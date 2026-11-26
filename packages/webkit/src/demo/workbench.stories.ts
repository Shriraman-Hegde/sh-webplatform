import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./workbench.js";
import "../components/wk-button.js";

const meta: Meta = {
  title: "Demo/Workbench",
  component: "wk-workbench",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<wk-workbench></wk-workbench>`,
};

export const StubButton: Story = {
  name: "Stub decorated button",
  render: () => html`<div style="padding: 1.5rem"><wk-button>Stub</wk-button></div>`,
};
