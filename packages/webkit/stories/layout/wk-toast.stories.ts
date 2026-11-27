import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-toast/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Toast",
  component: "wk-toast",
  tags: ["autodocs"],
  parameters: componentDocs("Short notice. duration is milliseconds; 0 stays until dismissed."),
  argTypes: {
    open: attr("Show the notice.", {
      control: "boolean",
      defaultValue: "true",
      type: "boolean",
    }),
    tone: attr("Status tone.", {
      control: "select",
      options: ["info", "success", "warning", "danger"],
      defaultValue: "success",
    }),
    message: attr("Notice text (slot).", { defaultValue: "Saved" }),
  },
  args: { open: true, tone: "success", message: "Saved" },
  render: (args) => html`
    <wk-toast ?open=${args.open} tone=${args.tone} duration="0"
      >${args.message}</wk-toast
    >
  `,
};

export default meta;
type Story = StoryObj;
export const Overview: Story = {};
export const Danger: Story = { args: { tone: "danger", message: "Could not save" } };
