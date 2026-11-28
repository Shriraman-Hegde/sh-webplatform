import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-banner/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Banner",
  component: "wk-banner",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Full-width message. dismissible emits wk-close.",
  ),
  argTypes: {
    tone: attr("info | success | warning | danger"),
    heading: attr("Banner heading"),
    dismissible: attr("Shows a dismiss button", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    open: attr("Banner is visible", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
  },
  render: () => html`<wk-banner tone="info" heading="Notice" dismissible>Maintenance tonight.</wk-banner>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
