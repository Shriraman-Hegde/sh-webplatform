import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-pagination/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Pagination",
  component: "wk-pagination",
  tags: ["autodocs"],
  parameters: componentDocs("Page through a list. Fires wk-change with the next page."),
  argTypes: {
    page: attr("Current page, starting at 1.", {
      control: "number",
      defaultValue: "1",
      type: "number",
    }),
    pages: attr("Total pages.", {
      control: "number",
      defaultValue: "8",
      type: "number",
    }),
  },
  args: { page: 1, pages: 8 },
  render: (args) => html`
    <wk-pagination page=${args.page} pages=${args.pages}></wk-pagination>
  `,
};

export default meta;
type Story = StoryObj;
export const Overview: Story = {};
