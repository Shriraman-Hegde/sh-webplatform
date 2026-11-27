import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-textarea/index.js";

const meta: Meta = {
  title: "Form/Textarea",
  component: "wk-textarea",
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`<div style="padding: 1.5rem; max-width: 28rem">
      <wk-textarea label="Notes" name="notes" .value=${"Short description"}></wk-textarea>
    </div>`,
};
