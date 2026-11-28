import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/layout/wk-calendar/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Layout/Calendar",
  component: "wk-calendar",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Month grid. value is YYYY-MM-DD. year and month select the visible month. Single arrows move a month. Double arrows move a year. The month and year labels open lists for jumping.",
  ),
  argTypes: {
    value: attr("Selected date"),
    year: attr("Visible year"),
    month: attr("Visible month, 0–11"),
  },
  render: () => html`<wk-calendar value="2026-11-28" year="2026" month="10"></wk-calendar>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
