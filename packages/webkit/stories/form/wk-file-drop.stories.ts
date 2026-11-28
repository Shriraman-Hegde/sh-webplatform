import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-file-drop/index.js";
import { attr, componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Form/File Drop",
  component: "wk-file-drop",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Drop zone. accept filters the dropped files. files is { name, size, type }[] after a drop or browse.",
  ),
  argTypes: {
    label: attr("Field label"),
    name: attr("Form name"),
    accept: attr("Accepted file types, such as image/* or .pdf"),
    multiple: attr("Allow several files", {
      control: "boolean",
      defaultValue: "false",
      type: "boolean",
    }),
    files: attr("Property: { name, size, type }[]", { control: false }),
    hint: attr("Helper text"),
    message: attr("Error or status text"),
    disabled: attr("Disables the drop zone", {
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
  render: () => html`<wk-file-drop label="Attachments" accept="image/*" multiple></wk-file-drop>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
