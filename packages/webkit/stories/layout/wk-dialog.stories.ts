import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/layout/wk-dialog/index.js";
import { docs, overviewPage } from "../_helpers.js";

const usage = `
<wk-dialog heading="Confirm" .open=\${open} @wk-close=\${...}>
  <p>Body</p>
  <wk-button slot="actions" variant="primary">OK</wk-button>
</wk-dialog>
`.trim();

function openDialog(id: string) {
  const d = document.getElementById(id) as (HTMLElement & { open: boolean }) | null;
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
  parameters: {
    ...docs(`Modal dialog. Emits \`wk-close\`. Body + \`actions\` slots.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    heading: { control: "text" },
  },
  args: { heading: "Confirm submit" },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-dialog", usage, [
      {
        heading: "Open via button",
        body: html`
          <wk-button
            variant="primary"
            @click=${() => openDialog("overview-dialog")}
            >Open dialog</wk-button
          >
          <wk-dialog
            id="overview-dialog"
            heading="Confirm submit"
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
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem">
      <wk-button
        variant="primary"
        @click=${() => openDialog("playground-dialog")}
        >Open</wk-button
      >
      <wk-dialog
        id="playground-dialog"
        heading=${args.heading}
        @wk-close=${(e: Event) => {
          (e.currentTarget as HTMLElement & { open: boolean }).open = false;
        }}
      >
        <p style="margin:0">Dialog playground body.</p>
        <wk-button slot="actions" variant="primary" @click=${closeHost}
          >Close</wk-button
        >
      </wk-dialog>
    </div>
  `,
};
