import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-scroll-area/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Scroll Area",
  component: "wk-scroll-area",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Scrollport with a max height. part=viewport.",
  ),
  argTypes: {
    "max-height": attr("CSS max-height. Default 16rem"),
  },
  render: () => html`<wk-scroll-area max-height="6rem"><p>Line 1</p><p>Line 2</p><p>Line 3</p><p>Line 4</p><p>Line 5</p></wk-scroll-area>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
