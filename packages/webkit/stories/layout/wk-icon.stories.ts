import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { generatedIconNames } from "@sh-webplatform/icons";
import "../../src/components/layout/wk-icon/index.js";

const meta: Meta = {
  title: "Layout/Icon",
  component: "wk-icon",
  argTypes: {
    name: {
      control: "select",
      options: [...generatedIconNames, "missing"],
    },
    label: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    name: "check",
    label: "Success",
    size: "md",
  },
  render: (args) => html`
    <div style="padding: 1.5rem">
      <wk-icon name=${args.name} label=${args.label} size=${args.size}></wk-icon>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Gallery: Story = {
  render: () => html`
    <div style="padding: 1.5rem; display: flex; flex-wrap: wrap; gap: 1rem">
      ${generatedIconNames.map(
        (name) => html`
          <div style="display:grid;gap:0.35rem;place-items:center;width:4.5rem">
            <wk-icon name=${name} size="lg"></wk-icon>
            <span style="font-size:0.7rem;color:var(--wk-muted)">${name}</span>
          </div>
        `,
      )}
    </div>
  `,
};
