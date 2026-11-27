import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/layout/wk-dialog/index.js";
import { attr, componentDocs } from "../_helpers.js";

const usage = `<wk-dialog heading="Confirm" .open=\${open} @wk-close=\${...}>
  <p>Body</p>
  <wk-button slot="actions" variant="primary">OK</wk-button>
</wk-dialog>`;

function openDialog(id: string) {
  const d = document.getElementById(id) as
    | (HTMLElement & { open: boolean })
    | null;
  if (d) d.open = true;
}

function closeHost(e: Event) {
  const host = (e.currentTarget as HTMLElement).closest(
    "wk-dialog",
  ) as HTMLElement & { open: boolean };
  host.open = false;
}

const meta: Meta = {
  title: "Layout/Dialog",
  component: "wk-dialog",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Modal dialog. Emits `wk-close`. Body + `actions` slots.",
    usage,
  ),
  argTypes: {
    heading: attr("Dialog heading.", { defaultValue: "" }),
  },
  args: { heading: "Confirm submit" },
  render: (args) => html`
    <wk-button
      variant="primary"
      @click=${() => openDialog("docs-dialog")}
      >Open dialog</wk-button
    >
    <wk-dialog
      id="docs-dialog"
      heading=${args.heading}
      @wk-close=${(e: Event) => {
        (e.currentTarget as HTMLElement & { open: boolean }).open = false;
      }}
    >
      <p style="margin:0">Submit the sample request?</p>
      <wk-button slot="actions" variant="secondary" @click=${closeHost}
        >Cancel</wk-button
      >
      <wk-button slot="actions" variant="primary" @click=${closeHost}
        >Confirm</wk-button
      >
    </wk-dialog>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
