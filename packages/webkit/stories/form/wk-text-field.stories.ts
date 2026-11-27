import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-text-field/index.js";
import { docs, overviewPage, stack } from "../_helpers.js";

const usage = `
<wk-text-field label="Title" name="title" value="Sample"></wk-text-field>
<wk-text-field label="Search" leading-icon="search" placeholder="Find…"></wk-text-field>
<wk-text-field label="Email" size="sm" error></wk-text-field>
`.trim();

const meta: Meta = {
  title: "Form/Text Field",
  component: "wk-text-field",
  parameters: {
    ...docs(`Single-line labeled input. Emits \`wk-input\`.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    placeholder: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    leadingIcon: { control: "text" },
    trailingIcon: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
  args: {
    label: "Title",
    name: "title",
    value: "Sample request",
    placeholder: "",
    size: "md",
    leadingIcon: "",
    trailingIcon: "",
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    overviewPage("wk-text-field", usage, [
      {
        heading: "Basics",
        body: stack(
          html`<wk-text-field label="Title" name="title" value="Sample"></wk-text-field>`,
          html`<wk-text-field
            label="Search"
            leading-icon="search"
            placeholder="Find…"
          ></wk-text-field>`,
          html`<wk-text-field
            label="Amount"
            trailing-icon="edit"
            value="42"
          ></wk-text-field>`,
        ),
      },
      {
        heading: "Sizes & states",
        body: stack(
          html`<wk-text-field label="Small" size="sm" value="sm"></wk-text-field>`,
          html`<wk-text-field label="Large" size="lg" value="lg"></wk-text-field>`,
          html`<wk-text-field label="Error" error value="Invalid"></wk-text-field>`,
          html`<wk-text-field label="Disabled" disabled value="Locked"></wk-text-field>`,
        ),
      },
    ]),
};

export const Playground: Story = {
  name: "Playground (in depth)",
  render: (args) => html`
    <div style="padding:1.5rem;max-width:28rem">
      <wk-text-field
        label=${args.label}
        name=${args.name}
        .value=${args.value}
        placeholder=${args.placeholder}
        size=${args.size}
        leading-icon=${args.leadingIcon || undefined}
        trailing-icon=${args.trailingIcon || undefined}
        ?disabled=${args.disabled}
        ?error=${args.error}
      ></wk-text-field>
    </div>
  `,
};
