import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import "../../src/components/layout/wk-toolbar/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Toolbar",
  component: "wk-toolbar",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Row of actions. Arrow keys move between the buttons. Style the row with `wk-toolbar::part(bar)`.",
  ),
  argTypes: {
    label: attr("Accessible name for the toolbar.", { defaultValue: "Record actions" }),
  },
  args: { label: "Record actions" },
  render: (args) => html`
    <wk-toolbar label=${args.label}>
      <wk-button>Save</wk-button>
      <wk-button variant="secondary">Cancel</wk-button>
      <wk-button variant="ghost">Archive</wk-button>
    </wk-toolbar>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
