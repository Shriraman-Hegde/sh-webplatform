import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-kbd/index.js";
import { componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Keyboard",
  component: "wk-kbd",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Keyboard key. part=key.",
  ),
  render: () => html`<wk-kbd>⌘K</wk-kbd>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
