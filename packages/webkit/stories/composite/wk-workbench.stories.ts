import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/composite/wk-workbench/index.js";

const meta: Meta = {
  title: "Composite/Workbench",
  component: "wk-workbench",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<wk-workbench></wk-workbench>`,
};
