import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-card/index.js";
import "../../src/components/form/wk-button/index.js";
import { attr, componentDocs } from "../_helpers.js";


const meta: Meta = {
  title: "Layout/Card",
  component: "wk-card",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Surface container with an optional heading, a default slot, and an actions slot. Style the surface with `wk-card::part(surface)`.",
  ),
  argTypes: {
    heading: attr("Optional card heading.", { defaultValue: "" }),
    body: attr("Body text for the demo slot.", { defaultValue: "" }),
  },
  args: { heading: "Request details", body: "Card body content goes here." },
  render: (args) => html`
    <div style="max-width:28rem">
      <wk-card heading=${args.heading}>${args.body}</wk-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const BodyOnly: Story = {
  args: { heading: "", body: "Untitled card" },
};

export const WithActions: Story = {
  render: () => html`
    <div style="max-width:28rem">
      <wk-card heading="Request details">
        Ready to file.
        <wk-button slot="actions" variant="secondary">Cancel</wk-button>
        <wk-button slot="actions">File</wk-button>
      </wk-card>
    </div>
  `,
};
