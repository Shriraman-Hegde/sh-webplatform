import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-textarea/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const usage = `
<wk-textarea label="Notes" name="notes" rows="4"></wk-textarea>
<wk-textarea label="Notes" rich></wk-textarea>
<wk-textarea label="Notes" rich show-icons size="lg"></wk-textarea>
`.trim();

const meta: Meta = {
  title: "Form/Textarea",
  component: "wk-textarea",
  parameters: {
    ...docs(`Multi-line notes. Plain by default; set \`rich\` for optional rich text.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    rows: { control: { type: "number", min: 2, max: 12 } },
    size: { control: "select", options: ["sm", "md", "lg"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    rich: { control: "boolean" },
    showIcons: { control: "boolean" },
  },
  args: {
    label: "Notes",
    name: "notes",
    value: "Short description",
    rows: 4,
    size: "md",
    placeholder: "",
    disabled: false,
    error: false,
    rich: false,
    showIcons: false,
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-textarea", usage, [
      {
        heading: "Plain",
        body: stack(
          html`<wk-textarea
            label="Notes"
            name="notes"
            .value=${"Plain text notes"}
          ></wk-textarea>`,
          html`<wk-textarea label="Small" size="sm" rows="2"></wk-textarea>`,
          html`<wk-textarea label="Error" error .value=${"Fix me"}></wk-textarea>`,
        ),
      },
      {
        heading: "Rich (optional)",
        body: stack(
          html`<wk-textarea
            label="Rich notes"
            rich
            .value=${"<p>Hello <strong>Team Alpha</strong>.</p>"}
          ></wk-textarea>`,
          html`<wk-textarea
            label="Rich + icons"
            rich
            show-icons
            .value=${"<p>Formatted notes</p>"}
          ></wk-textarea>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem;max-width:28rem">
      <wk-textarea
        label=${args.label}
        name=${args.name}
        rows=${args.rows}
        size=${args.size}
        placeholder=${args.placeholder}
        .value=${args.value}
        ?disabled=${args.disabled}
        ?error=${args.error}
        ?rich=${args.rich}
        ?show-icons=${args.showIcons}
      ></wk-textarea>
    </div>
  `,
};
