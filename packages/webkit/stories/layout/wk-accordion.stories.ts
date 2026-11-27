import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-accordion/index.js";
import { attr, componentDocs } from "../_helpers.js";

const items = [
  { id: "a", title: "Accordion title", icon: "info" },
  { id: "b", title: "Details", icon: "edit" },
  { id: "c", title: "History" },
];

const usage = `<wk-accordion
  .items=\${[{ id: "a", title: "Accordion title" }]}
  .openIds=\${["a"]}
>
  <div slot="a">Expanded content</div>
</wk-accordion>`;

const meta: Meta = {
  title: "Layout/Accordion",
  component: "wk-accordion",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Accordion shows a brief summary and expands to show additional content.",
    usage,
  ),
  argTypes: {
    multiple: attr("Allow multiple panels open at once.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    title: attr("Summary text for the first item (demo control).", {
      defaultValue: "Accordion title",
    }),
    withIcon: attr("Show optional icon on the first item.", {
      control: "boolean",
      defaultValue: "true",
      type: "boolean",
    }),
  },
  args: {
    multiple: false,
    title: "Accordion title",
    withIcon: true,
  },
  render: (args) => {
    const demoItems = [
      {
        id: "a",
        title: args.title as string,
        icon: args.withIcon ? "info" : undefined,
      },
      { id: "b", title: "Details", icon: args.withIcon ? "edit" : undefined },
      { id: "c", title: "History" },
    ];
    return html`
      <div style="max-width:28rem">
        <wk-accordion
          .items=${demoItems}
          .openIds=${[]}
          ?multiple=${args.multiple}
        >
          <div slot="a">Expanded content for the summary.</div>
          <div slot="b">Additional details.</div>
          <div slot="c">History content.</div>
        </wk-accordion>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Expand: Story = {
  render: () => html`
    <div style="max-width:28rem">
      <wk-accordion .items=${items} .openIds=${["a"]}>
        <div slot="a">Expanded content</div>
        <div slot="b">Details</div>
        <div slot="c">History</div>
      </wk-accordion>
    </div>
  `,
};

export const Multiple: Story = {
  args: { multiple: true },
  render: () => html`
    <div style="max-width:28rem">
      <wk-accordion multiple .items=${items} .openIds=${["a", "b"]}>
        <div slot="a">Overview</div>
        <div slot="b">Details</div>
        <div slot="c">History</div>
      </wk-accordion>
    </div>
  `,
};

export const WithIcon: Story = {
  args: { withIcon: true, title: "Accordion title" },
};

export const WithoutIcon: Story = {
  args: { withIcon: false, title: "Accordion title" },
};
