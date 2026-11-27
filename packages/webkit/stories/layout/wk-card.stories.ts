import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-card/index.js";

const meta: Meta = {
  title: "Layout/Card",
  component: "wk-card",
  argTypes: {
    heading: { control: "text" },
    body: { control: "text" },
  },
  args: {
    heading: "Request details",
    body: "Card body content for the workbench layout.",
  },
  render: (args) => html`
    <div style="padding: 1.5rem; max-width: 28rem">
      <wk-card heading=${args.heading}>
        <p style="margin:0;color:var(--wk-muted)">${args.body}</p>
      </wk-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
