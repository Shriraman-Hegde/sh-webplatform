import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-sticky/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Sticky",
  component: "wk-sticky",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Sticky bar. part=bar. offset is the top offset.",
  ),
  argTypes: {
    offset: attr("CSS top offset. Default 0px"),
  },
  render: () => html`<div style="height: 8rem; overflow: auto"><wk-sticky offset="0px">Section</wk-sticky><p>Body</p></div>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
