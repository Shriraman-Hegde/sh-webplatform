import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-description-list/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Description List",
  component: "wk-description-list",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Term and detail pairs. items is { term, detail }[].",
  ),
  argTypes: {
    items: attr("Property: { term, detail }[]", { control: false }),
  },
  render: () => html`<wk-description-list .items=${[{ term: "Owner", detail: "Ada" }, { term: "Team", detail: "Platform" }]}></wk-description-list>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
