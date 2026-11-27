import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-radio-group/index.js";

const meta: Meta = {
  title: "Form/Radio Group",
  component: "wk-radio-group",
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`<div style="padding: 1.5rem">
      <wk-radio-group
        label="Priority"
        name="priority"
        value="normal"
        .options=${[
          { value: "low", label: "Low" },
          { value: "normal", label: "Normal" },
          { value: "high", label: "High" },
        ]}
      ></wk-radio-group>
    </div>`,
};
