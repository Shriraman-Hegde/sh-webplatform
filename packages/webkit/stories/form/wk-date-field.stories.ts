import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-date-field/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/Date Field",
  component: "wk-date-field",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Date field. value is YYYY-MM-DD. The calendar icon sits inside the field. icon-position is start or end. It opens wk-calendar in a popover. part=control and part=picker.",
  ),
  args: {
    label: "Due",
    value: "2026-11-28",
    "icon-position": "end",
  },
  argTypes: {
    label: attr("Field label"),
    name: attr("Form name"),
    value: attr("YYYY-MM-DD"),
    open: attr("Calendar popover is open", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    "icon-position": attr("start | end. Default end", {
      control: "select",
      options: ["start", "end"],
      defaultValue: "end",
    }),
    size: attr("sm | md | lg"),
    hint: attr("Helper text"),
    message: attr("Error or status text"),
    disabled: attr("Disables the field", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    error: attr("Error state", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
  },
  render: (args) => html`
    <wk-date-field
      label=${args.label}
      value=${args.value}
      icon-position=${args["icon-position"]}
    ></wk-date-field>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
