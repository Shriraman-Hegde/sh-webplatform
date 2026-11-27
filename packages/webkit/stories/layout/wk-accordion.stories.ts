import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-accordion/index.js";

const items = [
  { id: "overview", title: "Overview" },
  { id: "details", title: "Details" },
  { id: "history", title: "History" },
];

const meta: Meta = {
  title: "Layout/Accordion",
  component: "wk-accordion",
  argTypes: {
    multiple: { control: "boolean" },
  },
  args: {
    multiple: false,
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 28rem">
      <wk-accordion
        .items=${items}
        .openIds=${["overview"]}
        ?multiple=${args.multiple}
      >
        <div slot="overview">High-level summary of the sample record.</div>
        <div slot="details">Additional fields and notes for the record.</div>
        <div slot="history">Recent updates from Team Alpha and Team Beta.</div>
      </wk-accordion>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Multiple: Story = {
  args: { multiple: true },
};
