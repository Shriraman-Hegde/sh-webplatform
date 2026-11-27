import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-switch/index.js";

const meta: Meta = {
  title: "Form/Switch",
  component: "wk-switch",
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`<div style="padding: 1.5rem">
      <wk-switch label="Notify me" name="notify"></wk-switch>
    </div>`,
};
