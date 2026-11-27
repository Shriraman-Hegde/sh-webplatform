import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/layout/wk-dialog/index.js";

const meta: Meta = {
  title: "Layout/Dialog",
  component: "wk-dialog",
};
export default meta;
type Story = StoryObj;

export const Open: Story = {
  render: () => html`
    <div style="padding: 1.5rem; min-height: 12rem">
      <wk-dialog heading="Confirm action" open>
        <p style="margin:0">
          This closes with Escape, backdrop, or the × control.
        </p>
        <wk-button slot="actions" variant="secondary">Cancel</wk-button>
        <wk-button slot="actions" variant="primary">Confirm</wk-button>
      </wk-dialog>
    </div>
  `,
};
