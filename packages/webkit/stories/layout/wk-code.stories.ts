import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-code/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Code",
  component: "wk-code",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Inline or block code. part=code or part=block.",
  ),
  argTypes: {
    block: attr("Renders a preformatted block", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
  },
  render: () => html`<div><wk-code>wk-button</wk-code><wk-code block>const open = true;</wk-code></div>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
