import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-select/index.js";
import { attr, componentDocs, disabledArg, sizeArg } from "../_helpers.js";

const options = [
  { value: "alpha", label: "Team Alpha", icon: "user" },
  { value: "beta", label: "Team Beta", icon: "home" },
  { value: "gamma", label: "Team Gamma", icon: "settings" },
];

const meta: Meta = {
  title: "Form/Select",
  component: "wk-select",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Labeled menu. Options can show icons. `placement` chooses the side the menu opens toward. `hoist` paints it on the top layer so it is not clipped.",
  ),
  argTypes: {
    label: attr("Field label.", { defaultValue: "" }),
    value: attr("Selected value.", {
      control: "select",
      options: options.map((option) => option.value),
      defaultValue: "",
    }),
    size: sizeArg,
    leadingIcon: attr("Optional leading icon name.", { defaultValue: "" }),
    placement: attr("Side the menu opens toward.", {
      control: "select",
      options: ["bottom", "top", "start", "end"],
      defaultValue: "bottom",
      type: '"bottom" | "top" | "start" | "end"',
    }),
    hoist: attr("Paint the menu on the top layer.", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    disabled: disabledArg,
  },
  args: {
    label: "Team",
    value: "alpha",
    size: "md",
    leadingIcon: "",
    placement: "bottom",
    hoist: true,
    disabled: false,
  },
  render: (args) => html`
    <div style="max-width:28rem;padding:6rem 2rem">
      <wk-select
        label=${args.label}
        .value=${args.value}
        size=${args.size}
        placement=${args.placement}
        ?hoist=${args.hoist}
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
  args: { leadingIcon: "search" },
};

export const OpensUpward: Story = {
  args: { placement: "top" },
};

export const OpensToEnd: Story = {
  args: { placement: "end" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
