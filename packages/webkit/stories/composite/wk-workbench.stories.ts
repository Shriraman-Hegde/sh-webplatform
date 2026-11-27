import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/composite/wk-workbench/index.js";
import { componentDocs } from "../_helpers.js";


const meta: Meta = {
  title: "Composite/Workbench",
  component: "wk-workbench",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    ...componentDocs(
      "Composition demo of form + layout primitives. Open individual component Overviews for Attributes.",
    ),
  },
  render: () => html`<wk-workbench></wk-workbench>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
