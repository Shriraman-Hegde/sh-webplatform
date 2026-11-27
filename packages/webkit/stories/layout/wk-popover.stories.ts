import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-popover/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Popover",
  component: "wk-popover",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Anchored panel for content. It light-dismisses. Style the panel with `wk-popover::part(panel)`.",
  ),
  argTypes: {
    label: attr("Trigger label.", { defaultValue: "Details" }),
    placement: attr("Which side the panel opens on.", {
      control: "select",
      options: ["bottom", "top"],
      defaultValue: "bottom",
      type: '"bottom" | "top"',
    }),
    open: attr("Panel is open.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
  },
  args: { label: "Details", placement: "bottom", open: false },
  render: (args) => html`
    <div style="padding:4rem 1rem">
      <wk-popover label=${args.label} placement=${args.placement} ?open=${args.open}>
        <p style="margin:0">Opened 2 days ago by the records desk.</p>
      </wk-popover>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Open: Story = {
  args: { open: true },
};
