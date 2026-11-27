import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-card/index.js";
import { attr, componentDocs } from "../_helpers.js";

const usage = `<wk-card heading="Request details">
  <p>Card body content</p>
</wk-card>`;

const meta: Meta = {
  title: "Layout/Card",
  component: "wk-card",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Surface container with optional heading and default slot.",
    usage,
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
