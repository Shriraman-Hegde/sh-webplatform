import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-inline-message/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Inline Message",
  component: "wk-inline-message",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Short status line under a field or section.",
  ),
  argTypes: {
    tone: attr("info | success | warning | danger"),
  },
  render: () => html`<wk-inline-message tone="danger">Title is required.</wk-inline-message>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
