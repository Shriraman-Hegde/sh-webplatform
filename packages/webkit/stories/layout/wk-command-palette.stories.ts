import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-command-palette/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Command Palette",
  component: "wk-command-palette",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Modal command list. Arrow keys move and Enter selects. commands is { value, label, group? }[]. The host sets open.",
  ),
  argTypes: {
    open: attr("Shows the dialog", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    query: attr("Filter text"),
    commands: attr("Property: { value, label, group? }[]", { control: false }),
  },
  render: () => html`<div><button type="button" @click=${(event: Event) => { const palette = (event.currentTarget as HTMLButtonElement).nextElementSibling as HTMLElement & { open: boolean }; palette.open = true; }}>Open commands</button><wk-command-palette .commands=${[{ value: "new", label: "New record", group: "File" }, { value: "search", label: "Search", group: "View" }]}></wk-command-palette></div>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
