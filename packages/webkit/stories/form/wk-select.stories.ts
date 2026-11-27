import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-select/index.js";
import { attr, componentDocs, disabledArg, sizeArg } from "../_helpers.js";

const options = [
  { value: "alpha", label: "Team Alpha" },
  { value: "beta", label: "Team Beta" },
  { value: "gamma", label: "Team Gamma" },
];

const usage = `<wk-select
  label="Team"
  name="team"
  value="alpha"
  .options=\${[{ value: "alpha", label: "Team Alpha" }]}
></wk-select>`;

const meta: Meta = {
  title: "Form/Select",
  component: "wk-select",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Labeled select. Emits `wk-change`. Optional leading icon; CSS chevron.",
    usage,
  ),
  argTypes: {
    label: attr("Field label.", { defaultValue: "" }),
    value: attr("Selected value.", {
      control: "select",
      options: options.map((o) => o.value),
      defaultValue: "",
    }),
    size: sizeArg,
    leadingIcon: attr("Optional leading icon name.", { defaultValue: "" }),
    disabled: disabledArg,
  },
  args: {
    label: "Team",
    value: "alpha",
    size: "md",
    leadingIcon: "",
    disabled: false,
  },
  render: (args) => html`
    <div style="max-width:28rem">
      <wk-select
        label=${args.label}
        .value=${args.value}
        size=${args.size}
        leading-icon=${args.leadingIcon || undefined}
        ?disabled=${args.disabled}
        .options=${options}
      ></wk-select>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const WithLeadingIcon: Story = {
  args: { leadingIcon: "user" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
