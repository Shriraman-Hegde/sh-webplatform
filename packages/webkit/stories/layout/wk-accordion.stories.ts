import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-accordion/index.js";
import { docs, overviewPage } from "../_helpers.js";
const items = [
  { id: "overview", title: "Overview", icon: "info" },
  { id: "details", title: "Details", icon: "edit" },
  { id: "history", title: "History" },
];

const usage = `
<wk-accordion
  .items=\${[{ id: "overview", title: "Overview", icon: "info" }]}
  .openIds=\${["overview"]}
  ?multiple=\${false}
>
  <div slot="overview">Panel</div>
</wk-accordion>
`.trim();

const meta: Meta = {
  title: "Layout/Accordion",
  component: "wk-accordion",
  parameters: {
    ...docs(`Expandable sections. Optional item \`icon\`. Emits \`wk-change\`.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: { multiple: { control: "boolean" } },
  args: { multiple: false },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-accordion", usage, [
      {
        heading: "Single open",
        body: html`
          <wk-accordion .items=${items} .openIds=${["overview"]}>
            <div slot="overview">High-level summary.</div>
            <div slot="details">Additional fields.</div>
            <div slot="history">Recent updates.</div>
          </wk-accordion>
        `,
      },
      {
        heading: "Multiple",
        body: html`
          <wk-accordion
            multiple
            .items=${items}
            .openIds=${["overview", "details"]}
          >
            <div slot="overview">Overview</div>
            <div slot="details">Details</div>
            <div slot="history">History</div>
          </wk-accordion>
        `,
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem;max-width:28rem">
      <wk-accordion
        .items=${items}
        .openIds=${["overview"]}
        ?multiple=${args.multiple}
      >
        <div slot="overview">Overview panel</div>
        <div slot="details">Details panel</div>
        <div slot="history">History panel</div>
      </wk-accordion>
    </div>
  `,
};
