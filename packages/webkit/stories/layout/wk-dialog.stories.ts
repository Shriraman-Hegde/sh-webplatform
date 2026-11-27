import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/layout/wk-dialog/index.js";

const meta: Meta = {
  title: "Layout/Dialog",
  component: "wk-dialog",
  argTypes: {
    heading: { control: "text" },
    open: { control: "boolean" },
    body: { control: "text" },
  },
  args: {
    heading: "Confirm action",
    open: true,
    body: "This closes with Escape, backdrop, or the × control.",
  },
  render: (args) => html`
    <div style="padding: 1.5rem; min-height: 12rem">
      <wk-dialog heading=${args.heading} ?open=${args.open}>
        <p style="margin:0">${args.body}</p>
        <wk-button slot="actions" variant="secondary">Cancel</wk-button>
        <wk-button slot="actions" variant="primary">Confirm</wk-button>
      </wk-dialog>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Open: Story = {};

export const Closed: Story = {
  args: { open: false },
};
