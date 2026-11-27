import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/layout/wk-tooltip/index.js";
import { attr, componentDocs } from "../_helpers.js";


const meta: Meta = {
  title: "Layout/Tooltip",
  component: "wk-tooltip",
  tags: ["autodocs"],
  parameters: componentDocs("Hover/focus tip around a slotted trigger."),
  argTypes: {
    content: attr("Tooltip text.", { defaultValue: "" }),
    placement: attr("Placement relative to the trigger.", {
      control: "select",
      options: ["top", "bottom"],
      defaultValue: "top",
      type: '"top" | "bottom"',
    }),
  },
  args: { content: "More about this action", placement: "top" },
  render: (args) => html`
    <div style="padding:2rem">
      <wk-tooltip content=${args.content} placement=${args.placement}>
        <wk-button variant="secondary">Hover me</wk-button>
      </wk-tooltip>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Bottom: Story = {
  args: { placement: "bottom", content: "Appears below" },
};
