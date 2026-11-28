import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-skip-link/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Skip Link",
  component: "wk-skip-link",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Link that stays hidden until it receives focus.",
  ),
  argTypes: {
    href: attr("Skip target. Default #main"),
    label: attr("Link text"),
  },
  render: () => html`<div><wk-skip-link href="#main"></wk-skip-link><main id="main">Content</main></div>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
