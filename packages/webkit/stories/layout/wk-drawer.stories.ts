import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-drawer/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Drawer",
  component: "wk-drawer",
  tags: ["autodocs"],
  parameters: componentDocs("Side panel. Closes on the backdrop, Escape, or the close button."),
  argTypes: {
    open: attr("Show the panel.", {
      control: "boolean",
      defaultValue: "true",
      type: "boolean",
    }),
    heading: attr("Panel heading.", { defaultValue: "Record" }),
    placement: attr("Which side the panel sits on.", {
      control: "select",
      options: ["end", "start"],
      defaultValue: "end",
      type: '"end" | "start"',
    }),
  },
  args: { open: true, heading: "Record", placement: "end" },
  render: (args) => html`
    <wk-drawer
      ?open=${args.open}
      heading=${args.heading}
      placement=${args.placement}
    >
      Details for the selected record.
    </wk-drawer>
  `,
};

export default meta;
type Story = StoryObj;
export const Overview: Story = {};
export const OpensFromStart: Story = { args: { placement: "start" } };
