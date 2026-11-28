import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-breadcrumbs/index.js";
import { attr, componentDocs } from "../_helpers.js";


const meta: Meta = {
  title: "Layout/Breadcrumbs",
  component: "wk-breadcrumbs",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Trail of links. items is a property.",
  ),
  argTypes: {
    items: attr("Property: { label, href?, icon? }[]", { control: false }),
  },
  render: () => html`
    <wk-breadcrumbs
      .items=${[
        { label: "Home", href: "#", icon: "home" },
        { label: "Team Alpha", href: "#", icon: "user" },
        { label: "ITEM-A" },
      ]}
    ></wk-breadcrumbs>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const WithoutIcons: Story = {
  render: () => html`
    <wk-breadcrumbs
      .items=${[
        { label: "Home", href: "#" },
        { label: "Records", href: "#" },
        { label: "ITEM-B" },
      ]}
    ></wk-breadcrumbs>
  `,
};
