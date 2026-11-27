import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { generatedIconNames } from "@sh-webplatform/icons";
import "../../src/components/layout/wk-icon/index.js";
import { attr, componentDocs, sizeArg } from "../_helpers.js";

const usage = `bootstrapWebkit({ icons: iconRegistry });
<wk-icon name="check" label="Done" size="md"></wk-icon>`;

const meta: Meta = {
  title: "Layout/Icon",
  component: "wk-icon",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Named SVG from `@sh-webplatform/icons` via host `bootstrapWebkit({ icons })`.",
    usage,
  ),
  argTypes: {
    name: attr("Icon name from the registry.", {
      control: "select",
      options: [...generatedIconNames],
      defaultValue: "check",
    }),
    label: attr("Accessible label (role=img when set).", { defaultValue: "" }),
    size: sizeArg,
  },
  args: { name: "check", label: "Success", size: "md" },
  render: (args) => html`
    <wk-icon name=${args.name} label=${args.label} size=${args.size}></wk-icon>
  `,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:1rem">
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
