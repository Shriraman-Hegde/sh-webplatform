import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-empty/index.js";
import "../../src/components/form/wk-button/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Empty",
  component: "wk-empty",
  tags: ["autodocs"],
  parameters: componentDocs("Empty state with an icon, a heading, body text, and an actions slot."),
  argTypes: {
    heading: attr("Heading.", { defaultValue: "No records" }),
    icon: attr("Icon name.", { defaultValue: "search" }),
  },
  args: { heading: "No records", icon: "search" },
  render: (args) => html`
    <wk-empty heading=${args.heading} icon=${args.icon}>
      <p>Try another filter.</p>
      <wk-button slot="actions">Clear filters</wk-button>
    </wk-empty>
  `,
};

export default meta;
type Story = StoryObj;
export const Overview: Story = {};
