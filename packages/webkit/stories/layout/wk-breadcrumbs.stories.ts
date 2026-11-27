import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-breadcrumbs/index.js";

const meta: Meta = {
  title: "Layout/Breadcrumbs",
  component: "wk-breadcrumbs",
  render: () => html`
    <div style="padding: 1.5rem">
      <wk-breadcrumbs
        .items=${[
          { label: "Home", href: "#" },
          { label: "Team Alpha", href: "#" },
          { label: "ITEM-A" },
        ]}
      ></wk-breadcrumbs>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
