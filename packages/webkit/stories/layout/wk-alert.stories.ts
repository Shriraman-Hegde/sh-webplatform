import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-alert/index.js";
import { attr, componentDocs, sizeArg } from "../_helpers.js";


const meta: Meta = {
  title: "Layout/Alert",
  component: "wk-alert",
  tags: ["autodocs"],
  parameters: componentDocs("Inline message for feedback. Icons are optional (`show-icon` or `icon`)."),
  argTypes: {
    tone: attr("Alert tone.", {
      control: "select",
      options: ["info", "success", "warning", "danger"],
      defaultValue: "info",
      type: '"info" | "success" | "warning" | "danger"',
    }),
    size: sizeArg,
    heading: attr("Optional heading text.", { defaultValue: "" }),
    body: attr("Body text (slot).", { defaultValue: "" }),
    showIcon: attr("Show the default tone icon.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    icon: attr("Override icon name (optional).", { defaultValue: "" }),
  },
  args: {
    tone: "info",
    size: "md",
    heading: "Heads up",
    body: "Review the request before submitting.",
    showIcon: false,
    icon: "",
  },
  render: (args) => html`
    <div style="max-width:32rem">
      <wk-alert
        tone=${args.tone}
        size=${args.size}
        heading=${args.heading}
        icon=${args.icon || undefined}
        ?show-icon=${args.showIcon}
        >${args.body}</wk-alert
      >
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const WithIcon: Story = {
  args: { showIcon: true },
};

export const Success: Story = {
  args: { tone: "success", heading: "Saved", body: "Changes applied.", showIcon: true },
};

export const Danger: Story = {
  args: {
    tone: "danger",
    heading: "Action required",
    body: "This record failed validation.",
    showIcon: true,
  },
};
